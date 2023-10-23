using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LLocate.Application.Common.Interfaces;
using LLocate.Application.Sheets.DTOs;
using LLocate.Application.Sheets.Queries;
using LLocate.Application.Users.DTOs;
using LLocate.Domain.Enums;

namespace LLocate.Application.Users.Queries;
public class GetUserQuery : IRequest<GetUserDto>
{
}

public class GetUserQueryHandler : IRequestHandler<GetUserQuery, GetUserDto>
{
    private readonly IApplicationDbContext _context;
    private readonly IUser _user;
    private readonly IIdentityService _identity;

    public GetUserQueryHandler(IApplicationDbContext context, IUser user, IIdentityService identity)
    {
        _context = context;
        _user = user;
        _identity = identity;
    }

    public async Task<GetUserDto> Handle(GetUserQuery request, CancellationToken cancellationToken)
    {
        return await _identity.GetUserAsync(_user.Id ?? string.Empty);
    }
}
