using LLocate.Domain.Enums;
using Microsoft.AspNetCore.Identity;

namespace LLocate.Infrastructure.Identity;

public class ApplicationUser : IdentityUser
{
    public string Name { get; set; } = string.Empty;
    public string CurrencyCode { get; set; } = "MYR";
    public DarkModePreference DarkModePreference { get; set; }
    public string DefaultTheme { get; set; } = string.Empty;
    public bool IsCompleteOnboarding { get; set; } = false;
    public bool IsCompleteWalkthrough { get; set; } = false;
}
