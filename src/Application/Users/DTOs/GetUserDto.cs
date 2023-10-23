using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LLocate.Application.Users.DTOs;
public class GetUserDto
{
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string DefaultTheme { get; set; } = "theme-light";
    public string CurrencyCode { get; set; } = "MYR";
    public bool IsCompleteOnboarding { get; set; }
}
