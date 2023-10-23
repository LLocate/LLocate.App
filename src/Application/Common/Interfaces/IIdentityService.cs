using LLocate.Application.Common.Models;
using LLocate.Application.Users.DTOs;

namespace LLocate.Application.Common.Interfaces;

public interface IIdentityService
{
    Task<GetUserDto> GetUserAsync(string userId);
    Task<string?> GetUserNameAsync(string userId);

    Task<bool> IsInRoleAsync(string userId, string role);

    Task<bool> AuthorizeAsync(string userId, string policyName);

    Task<(Result Result, string UserId)> CreateUserAsync(string userName, string password);

    Task<Result> DeleteUserAsync(string userId);
}
