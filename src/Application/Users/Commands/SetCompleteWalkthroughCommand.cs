using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LLocate.Application.Common.Interfaces;

namespace LLocate.Application.Users.Commands;
public class SetCompleteWalkthroughCommand : IRequest<bool>
{
    public bool IsCompleted { get; set; }
}

public class SetCompleteWalkthroughCommandHandler : IRequestHandler<SetCompleteWalkthroughCommand, bool>
{
    private readonly IApplicationDbContext _context;
    private readonly IUser _user;
    private readonly IIdentityService _identity;

    public SetCompleteWalkthroughCommandHandler(IApplicationDbContext context, IUser user, IIdentityService identity)
    {
        _context = context;
        _user = user;
        _identity = identity;
    }

    public async Task<bool> Handle(SetCompleteWalkthroughCommand request, CancellationToken cancellationToken)
    {
        return await _identity.UpdateCompleteWalkthrough(_user.Id ?? string.Empty, request.IsCompleted);
    }
}
