using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LLocate.Application.Common.Extensions;
using LLocate.Application.Common.Interfaces;
using LLocate.Domain.Entities.Goals;

namespace LLocate.Application.Goals.Queries;
public class GetValidGoalsQuery : IRequest<List<Goal>>
{
}

public class GetValidGoalsQueryHandler : IRequestHandler<GetValidGoalsQuery, List<Goal>>
{
    private readonly IApplicationDbContext _context;
    private readonly IUser _user;

    public GetValidGoalsQueryHandler(IApplicationDbContext context, IUser user)
    {
        _context = context;
        _user = user;
    }

    public async Task<List<Goal>> Handle(GetValidGoalsQuery request, CancellationToken cancellationToken)
    {
        var result = await _context.Goals.FilterByUserId(_user.Id ?? string.Empty)
            .Where(x => !x.IsDeleted && !x.IsDeactivated)
            .AsNoTracking().ToListAsync(cancellationToken);

        return result;
    }
}

