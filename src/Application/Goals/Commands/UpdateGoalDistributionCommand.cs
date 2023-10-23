using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LLocate.Application.Common.Extensions;
using LLocate.Application.Common.Interfaces;
using LLocate.Domain.Entities.Goals;

namespace LLocate.Application.Goals.Commands;
public class UpdateGoalDistributionCommand : IRequest<bool>
{
    public List<Goal> Models { get; set; } = new();
}

public class UpdateGoalDistributionCommandHandler : IRequestHandler<UpdateGoalDistributionCommand, bool>
{
    private readonly IApplicationDbContext _context;
    private readonly IUser _user;

    public UpdateGoalDistributionCommandHandler(IApplicationDbContext context, IUser user)
    {
        _context = context;
        _user = user;
    }

    public async Task<bool> Handle(UpdateGoalDistributionCommand request, CancellationToken cancellationToken)
    {
        var ids = request.Models.Select(x => x.Id);
        var results = await _context.Goals
            .FilterByUserId(_user.Id ?? string.Empty)
            .Where(x => ids.Contains(x.Id)).ToListAsync(cancellationToken);
        
        foreach(var result in results)
        {
            result.DefaultContributionPercentage = request.Models.First(x => x.Id == result.Id).DefaultContributionPercentage;
        }

        await _context.SaveChangesAsync(cancellationToken);

        return true;
    }
}