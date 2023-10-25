using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LLocate.Domain.Enums;

namespace LLocate.Application.Users.DTOs;
public class UpdateUserDto
{
    public string Name { get; set; } = string.Empty;
    public string DefaultTheme { get; set; } = "";
    public DarkModePreference DarkModePreference { get; set; }
    public string CurrencyCode { get; set; } = "MYR";
}
