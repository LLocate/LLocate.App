using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LLocate.Application.Common.Interfaces;
using LLocate.Application.Users.DTOs;

namespace LLocate.Application.Users.Commands;
public class UpdateUserCommand : IRequest<UpdateUserDto>
{
    public UpdateUserDto model { get; set; } = new UpdateUserDto();
}

public class UpdateUserCommandHandler : IRequestHandler<UpdateUserCommand, UpdateUserDto>
{
    private readonly IApplicationDbContext _context;
    private readonly IUser _user;
    private readonly IIdentityService _identity;

    public UpdateUserCommandHandler(IApplicationDbContext context, IUser user, IIdentityService identity)
    {
        _context = context;
        _user = user;
        _identity = identity;
    }

    public async Task<UpdateUserDto> Handle(UpdateUserCommand request, CancellationToken cancellationToken)
    {
        return await _identity.UpdateUser(_user.Id ?? string.Empty, request.model);
    }
}
