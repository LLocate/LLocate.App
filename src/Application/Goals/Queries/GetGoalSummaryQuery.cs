using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LLocate.Application.Common.Extensions;
using LLocate.Application.Common.Interfaces;
using LLocate.Application.Goals.DTOs;
using LLocate.Domain.Entities.Goals;
using LLocate.Domain.Enums;

namespace LLocate.Application.Goals.Queries;
public class GetGoalSummaryQuery : IRequest<GoalSummaryDto>
{
}

public class GetGoalSummaryQueryHandler : IRequestHandler<GetGoalSummaryQuery, GoalSummaryDto>
{
    private readonly IApplicationDbContext _context;
    private readonly IUser _user;

    public GetGoalSummaryQueryHandler(IApplicationDbContext context, IUser user)
    {
        _context = context;
        _user = user;
    }

    public async Task<GoalSummaryDto> Handle(GetGoalSummaryQuery request, CancellationToken cancellationToken)
    {
        var results = await _context.Goals.FilterByUserId(_user.Id ?? string.Empty)
            .Include(x => x.Entries)
            .ThenInclude(x => x.GoalEntries)
            .Where(x => !x.IsDeleted).AsNoTracking().ToListAsync(cancellationToken);

        var returnValue = new GoalSummaryDto();
        foreach(var result in results)
        {
            var item = new GoalSummaryItemDto();
            item.Id = result.Id;
            item.Name = result.Name;
            item.StartDate = result.StartDate;
            item.TargetDate = result.TargetDate;
            item.TargetAmount = result.Amount;
            item.Type = result.Type;
            item.IsDeactivated = result.IsDeactivated;

            item.Accumulated = result.Entries.Where(x => x.Type == EntryType.Deposit).SelectMany(x => x.GoalEntries).Where(x => x.GoalId == item.Id).Sum(x => x.Amount);
            item.Utilized = result.Entries.Where(x => x.Type == EntryType.Withdraw).SelectMany(x => x.GoalEntries).Where(x => x.GoalId == item.Id).Sum(x => x.Amount);
            returnValue.Items.Add(item);
            returnValue.CurrentBalance += item.Accumulated;
            returnValue.CurrentBalance -= item.Utilized;

        }

        return returnValue;
    }
}
