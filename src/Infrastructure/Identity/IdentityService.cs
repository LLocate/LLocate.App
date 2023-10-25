using LLocate.Application.Common.Interfaces;
using LLocate.Application.Common.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using LLocate.Application.Users.DTOs;

namespace LLocate.Infrastructure.Identity;

public class IdentityService : IIdentityService
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly IUserClaimsPrincipalFactory<ApplicationUser> _userClaimsPrincipalFactory;
    private readonly IAuthorizationService _authorizationService;

    public IdentityService(
        UserManager<ApplicationUser> userManager,
        IUserClaimsPrincipalFactory<ApplicationUser> userClaimsPrincipalFactory,
        IAuthorizationService authorizationService)
    {
        _userManager = userManager;
        _userClaimsPrincipalFactory = userClaimsPrincipalFactory;
        _authorizationService = authorizationService;
    }

    public async Task<GetUserDto> GetUserAsync(string userId)
    {
        var user = await _userManager.Users.FirstAsync(u => u.Id == userId);
        if (user == null)
            return new GetUserDto();

        return new GetUserDto { 
            Email = user.Email ?? string.Empty, 
            Name = user.Name ?? string.Empty, 
            DarkModePreference = user.DarkModePreference,
            DefaultTheme = user.DefaultTheme, 
            CurrencyCode = user.CurrencyCode,
            IsCompleteOnboarding = user.IsCompleteOnboarding,
            IsCompleteWalkthrough = user.IsCompleteWalkthrough
        };
    }

    public async Task<string?> GetUserNameAsync(string userId)
    {
        var user = await _userManager.Users.FirstAsync(u => u.Id == userId);

        return user.UserName;
    }

    public async Task<(Result Result, string UserId)> CreateUserAsync(string userName, string password)
    {
        var user = new ApplicationUser
        {
            UserName = userName,
            Email = userName,
        };

        var result = await _userManager.CreateAsync(user, password);

        return (result.ToApplicationResult(), user.Id);
    }

    public async Task<bool> IsInRoleAsync(string userId, string role)
    {
        var user = _userManager.Users.SingleOrDefault(u => u.Id == userId);

        return user != null && await _userManager.IsInRoleAsync(user, role);
    }

    public async Task<bool> UpdateCompleteOnboarding(string userId, bool value)
    {
        var user = _userManager.Users.SingleOrDefault(u => u.Id == userId);
        if (user is null)
            return false;
        user.IsCompleteOnboarding = value;
        await _userManager.UpdateAsync(user);
        return true;
    }

    public async Task<bool> UpdateCompleteWalkthrough(string userId, bool value)
    {
        var user = _userManager.Users.SingleOrDefault(u => u.Id == userId);
        if (user is null)
            return false;
        user.IsCompleteWalkthrough = value;
        await _userManager.UpdateAsync(user);
        return true;
    }

    public async Task<string> UpdateUserDefaultTheme(string userId, string theme)
    {
        var user = _userManager.Users.SingleOrDefault(u => u.Id == userId);
        if (user is null)
            return string.Empty;
        user.DefaultTheme = theme;
        await _userManager.UpdateAsync(user);
        return theme;
    }
    public async Task<string> UpdateUserCurrencyCode(string userId, string currencyCode)
    {
        var user = _userManager.Users.SingleOrDefault(u => u.Id == userId);
        if (user is null)
            return string.Empty;
        user.CurrencyCode = currencyCode;
        await _userManager.UpdateAsync(user);
        return currencyCode;
    }

    public async Task<UpdateUserDto> UpdateUser(string userId, UpdateUserDto model)
    {
        var user = _userManager.Users.SingleOrDefault(u => u.Id == userId);
        if (user is null)
            return new UpdateUserDto();

        user.Name = model.Name;
        user.DarkModePreference = model.DarkModePreference;
        user.DefaultTheme = model.DefaultTheme;
        user.CurrencyCode = model.CurrencyCode;

        await _userManager.UpdateAsync(user);
        return model;
    }


    public async Task<bool> AuthorizeAsync(string userId, string policyName)
    {
        var user = _userManager.Users.SingleOrDefault(u => u.Id == userId);

        if (user == null)
        {
            return false;
        }

        var principal = await _userClaimsPrincipalFactory.CreateAsync(user);

        var result = await _authorizationService.AuthorizeAsync(principal, policyName);

        return result.Succeeded;
    }

    public async Task<Result> DeleteUserAsync(string userId)
    {
        var user = _userManager.Users.SingleOrDefault(u => u.Id == userId);

        return user != null ? await DeleteUserAsync(user) : Result.Success();
    }

    public async Task<Result> DeleteUserAsync(ApplicationUser user)
    {
        var result = await _userManager.DeleteAsync(user);

        return result.ToApplicationResult();
    }
}
