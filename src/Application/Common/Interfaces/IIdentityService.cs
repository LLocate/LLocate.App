using LLocate.Application.Common.Models;
using LLocate.Application.Users.DTOs;

namespace LLocate.Application.Common.Interfaces;

public interface IIdentityService
{
    Task<GetUserDto> GetUserAsync(string userId);
    Task<string?> GetUserNameAsync(string userId);

    Task<bool> IsInRoleAsync(string userId, string role);
    Task<bool> UpdateCompleteOnboarding(string userId, bool value);
    Task<bool> UpdateCompleteWalkthrough(string userId, bool value);
    Task<string> UpdateUserDefaultTheme(string userId, string theme);
    Task<string> UpdateUserCurrencyCode(string userId, string currencyCode);
    Task<UpdateUserDto> UpdateUser(string userId, UpdateUserDto model);

    Task<bool> AuthorizeAsync(string userId, string policyName);

    Task<(Result Result, string UserId)> CreateUserAsync(string userName, string password);

    Task<Result> DeleteUserAsync(string userId);
}
