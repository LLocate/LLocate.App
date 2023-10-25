using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LLocate.Application.Common.Interfaces;

namespace LLocate.Application.Users.Commands;
public class SetDefaultCurrencyCommand : IRequest<string>
{
    public string CurrencyCode { get; set; } = "";
}

public class SetDefaultCurrencyCommandHandler : IRequestHandler<SetDefaultCurrencyCommand, string>
{
    private readonly IApplicationDbContext _context;
    private readonly IUser _user;
    private readonly IIdentityService _identity;

    public SetDefaultCurrencyCommandHandler(IApplicationDbContext context, IUser user, IIdentityService identity)
    {
        _context = context;
        _user = user;
        _identity = identity;
    }

    public async Task<string> Handle(SetDefaultCurrencyCommand request, CancellationToken cancellationToken)
    {
        return await _identity.UpdateUserCurrencyCode(_user.Id ?? string.Empty, request.CurrencyCode);
    }
}
