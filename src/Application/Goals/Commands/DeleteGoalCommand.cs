using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LLocate.Application.Common.Extensions;
using LLocate.Application.Common.Interfaces;
using LLocate.Domain.Entities;
using LLocate.Domain.Entities.Goals;
using LLocate.Domain.Events;

namespace LLocate.Application.Goals.Commands;
public class DeleteGoalCommand : IRequest<bool>
{
    public int Id { get; set; }
}

public class DeleteGoalCommandHandler : IRequestHandler<DeleteGoalCommand, bool>
{
    private readonly IApplicationDbContext _context;
    private readonly IUser _user;

    public DeleteGoalCommandHandler(IApplicationDbContext context,IUser user)
    {
        _context = context;
        _user = user;
    }

    public async Task<bool> Handle(DeleteGoalCommand request, CancellationToken cancellationToken)
    {
        if (request.Id <= 0)
            return false;

        var entity = await _context.Goals.FilterByUserId(_user.Id ?? string.Empty).FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);
        if (entity == null)
            return false;

        entity.IsDeleted = true;
        await _context.SaveChangesAsync(cancellationToken);
        return true;
    }
}