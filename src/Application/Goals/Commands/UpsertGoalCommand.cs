using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LLocate.Application.Common.Interfaces;
using LLocate.Domain.Entities;
using LLocate.Domain.Entities.Goals;
using LLocate.Domain.Enums;
using LLocate.Domain.Events;

namespace LLocate.Application.Goals.Commands;
public class UpsertGoalCommand : IRequest<Goal>
{
    public Goal Model { get; set; } = new Goal();
}

public class UpsertGoalCommandHandler : IRequestHandler<UpsertGoalCommand, Goal>
{
    private readonly IApplicationDbContext _context;
    private readonly IUser _user;

    public UpsertGoalCommandHandler(IApplicationDbContext context, IUser user)
    {
        _context = context;
        _user = user;
    }

    public async Task<Goal> Handle(UpsertGoalCommand request, CancellationToken cancellationToken)
    {
        var entity = request.Model;
        if(entity.Type == GoalType.Progressive)
        {
            entity.StartDate = null;
            entity.TargetDate = null;
        }
        if(entity.Id > 0) { 
            _context.Goals.Update(entity);
        }
        else
        {
            await _context.Goals.AddAsync(entity, cancellationToken);
        }

        await _context.SaveChangesAsync(cancellationToken);

        return entity;
    }
}