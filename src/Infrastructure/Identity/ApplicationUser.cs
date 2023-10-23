using Microsoft.AspNetCore.Identity;

namespace LLocate.Infrastructure.Identity;

public class ApplicationUser : IdentityUser
{
    public string CurrencyCode { get; set; } = "MYR";
    public string DefaultTheme { get; set; } = "theme-light";
    public bool IsCompleteOnboarding { get; set; } = false;
}
