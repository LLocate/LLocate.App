using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LLocate.Application.Common.Extensions;
using LLocate.Application.Common.Interfaces;
using LLocate.Application.TodoItems.Commands.CreateTodoItem;
using LLocate.Domain.Entities;
using LLocate.Domain.Entities.Goals;
using LLocate.Domain.Events;

namespace LLocate.Application.Goals.Queries;
public record GetAllGoalQuery : IRequest<List<Goal>>
{
}

public class GetAllGoalQueryHandler : IRequestHandler<GetAllGoalQuery, List<Goal>>
{
    private readonly IApplicationDbContext _context;
    private readonly IUser _user;

    public GetAllGoalQueryHandler(IApplicationDbContext context, IUser user)
    {
        _context = context;
        _user = user;
    }

    public async Task<List<Goal>> Handle(GetAllGoalQuery request, CancellationToken cancellationToken)
    {
        var result = await _context.Goals.FilterByUserId(_user.Id ?? string.Empty).Where(x => !x.IsDeleted).AsNoTracking().ToListAsync(cancellationToken);

        return result;
    }
}
