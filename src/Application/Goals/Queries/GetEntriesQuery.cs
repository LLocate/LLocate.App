using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LLocate.Application.Common.Extensions;
using LLocate.Application.Common.Interfaces;
using LLocate.Domain.Entities.Goals;

namespace LLocate.Application.Goals.Queries;
public class GetEntriesQuery : IRequest<List<Entry>>
{
}

public class GetEntriesQueryHandler : IRequestHandler<GetEntriesQuery, List<Entry>>
{
    private readonly IApplicationDbContext _context;
    private readonly IUser _user;

    public GetEntriesQueryHandler(IApplicationDbContext context, IUser user)
    {
        _context = context;
        _user = user;
    }

    public async Task<List<Entry>> Handle(GetEntriesQuery request, CancellationToken cancellationToken)
    {
        var result = await _context.Entries.FilterByUserId(_user.Id ?? string.Empty).Where(x => !x.IsDeleted).Include(x => x.GoalEntries).ThenInclude(x => x.Goal).AsNoTracking().OrderByDescending(x => x.TransactionDate).ToListAsync(cancellationToken);

        return result;
    }
}
