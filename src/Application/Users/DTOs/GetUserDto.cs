﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LLocate.Domain.Enums;

namespace LLocate.Application.Users.DTOs;
public class GetUserDto
{
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public DarkModePreference DarkModePreference { get; set; }
    public string DefaultTheme { get; set; } = "";
    public string CurrencyCode { get; set; } = "MYR";
    public bool IsCompleteOnboarding { get; set; }
    public bool IsCompleteWalkthrough { get; set; }
}
