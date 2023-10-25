using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LLocate.Application.Common.Interfaces;
using LLocate.Application.Users.DTOs;
using LLocate.Application.Users.Queries;

namespace LLocate.Application.Users.Commands;
public class SetCompleteOnboardingCommand : IRequest<bool>
{
    public bool IsCompleted { get; set; }
}

public class SetCompleteOnboardingCommandHandler : IRequestHandler<SetCompleteOnboardingCommand, bool>
{
    private readonly IApplicationDbContext _context;
    private readonly IUser _user;
    private readonly IIdentityService _identity;

    public SetCompleteOnboardingCommandHandler(IApplicationDbContext context, IUser user, IIdentityService identity)
    {
        _context = context;
        _user = user;
        _identity = identity;
    }

    public async Task<bool> Handle(SetCompleteOnboardingCommand request, CancellationToken cancellationToken)
    {
        return await _identity.UpdateCompleteOnboarding(_user.Id ?? string.Empty, request.IsCompleted);
    }
}
