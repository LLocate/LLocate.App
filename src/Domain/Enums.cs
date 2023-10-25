namespace LLocate.Domain.Enums;

public enum DarkModePreference
{
    SystemDefault = 0,
    Light = 1,
    Dark = 2
}
public enum PriorityLevel
{
    None = 0,
    Low = 1,
    Medium = 2,
    High = 3
}

public enum SheetSettingType
{
    Monthly = 0
}

public enum SheetItemCategory
{
    Needs = 0,
    Wants = 1,
    Savings = 2,

    Others = 98,
    None = 99,
}

public enum SheetItemEntryType
{
    Payment = 0,
    Earning = 1,
}

public enum EntryType
{
    Deposit = 0,
    Withdraw = 1
}

public enum GoalType
{
    Targeted = 0,
    Progressive = 1,
}