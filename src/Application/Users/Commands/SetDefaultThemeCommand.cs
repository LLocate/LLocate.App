using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LLocate.Application.Common.Interfaces;

namespace LLocate.Application.Users.Commands;
public class SetDefaultThemeCommand : IRequest<string>
{
    public string DefaultTheme { get; set; } = "";
}

public class SetDefaultThemeCommandHandler : IRequestHandler<SetDefaultThemeCommand, string>
{
    private readonly IApplicationDbContext _context;
    private readonly IUser _user;
    private readonly IIdentityService _identity;

    public SetDefaultThemeCommandHandler(IApplicationDbContext context, IUser user, IIdentityService identity)
    {
        _context = context;
        _user = user;
        _identity = identity;
    }

    public async Task<string> Handle(SetDefaultThemeCommand request, CancellationToken cancellationToken)
    {
        return await _identity.UpdateUserDefaultTheme(_user.Id ?? string.Empty, request.DefaultTheme);
    }
}
