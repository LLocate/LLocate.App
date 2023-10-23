using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LLocate.Application.Common.Extensions;
using LLocate.Application.Common.Interfaces;
using LLocate.Domain.Entities.Goals;

namespace LLocate.Application.Goals.Queries;
public class GetGoalSettingQuery : IRequest<GoalSetting>
{
}

public class GetGoalSettingQueryHandler : IRequestHandler<GetGoalSettingQuery, GoalSetting>
{
    private readonly IApplicationDbContext _context;
    private readonly IUser _user;

    public GetGoalSettingQueryHandler(IApplicationDbContext context, IUser user)
    {
        _context = context;
        _user = user;
    }

    public async Task<GoalSetting> Handle(GetGoalSettingQuery request, CancellationToken cancellationToken)
    {
        var result = await _context.GoalSettings.FilterByUserId(_user.Id ?? string.Empty).AsNoTracking().FirstOrDefaultAsync(cancellationToken);
        if(result == null)
        {
            result = new GoalSetting();
            await _context.GoalSettings.AddAsync(result);
            await _context.SaveChangesAsync(cancellationToken);
        }
        return result;
    }
}

