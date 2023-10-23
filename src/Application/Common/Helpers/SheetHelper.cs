using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LLocate.Application.Common.Interfaces;
using LLocate.Domain.Common;
using LLocate.Domain.Entities.Sheets;

namespace LLocate.Application.Common.Helpers;
public static class SheetHelper
{
    public static (bool isInPeriod, int totalMonths, int currentMonth) IsInInstallmentPeriod(SheetItemSetting sheetItemSetting, int currentYear, int currentMonth)
    {
        if (!sheetItemSetting.IsInstallment 
            || !sheetItemSetting.InstallmentStartMonth.HasValue
            || !sheetItemSetting.InstallmentStartYear.HasValue
            || !sheetItemSetting.InstallmentEndYear.HasValue
            || !sheetItemSetting.InstallmentEndMonth.HasValue
            ) return (false, 0, 0 );
        var startDate = new DateTime(sheetItemSetting.InstallmentStartYear.Value, sheetItemSetting.InstallmentStartMonth.Value, 1);
        var endDate = new DateTime(sheetItemSetting.InstallmentEndYear.Value, sheetItemSetting.InstallmentEndMonth.Value, 1);
        var currentDate = new DateTime(currentYear, currentMonth, 1);
        
        int numberOfMonths = ((endDate.Year - startDate.Year) * 12) + endDate.Month - startDate.Month;

        var currentMonthCheck = startDate;
        int monthCount = 0;

        while (currentMonthCheck <= endDate)
        {
            if (currentDate >= currentMonthCheck && currentDate < currentMonthCheck.AddMonths(1))
            {
                // currentDate is within the current month
                Console.WriteLine($"You are currently in month {monthCount + 1}: {currentMonthCheck.ToString("MMMM yyyy")}");
                break; // You can exit the loop once you find the current month
            }

            // Move to the next month
            currentMonthCheck = currentMonthCheck.AddMonths(1);
            monthCount++;
        }

        //// If currentDate is not within the specified range, you can handle it accordingly.
        //if (currentMonthCheck > endDate)
        //{
        //    Console.WriteLine("Current date is outside the specified range.");
        //}

        return (true, numberOfMonths + 1, monthCount + 1);
    }

    //public void ThrowIfNotBelongsToUser<T>(T entity, IUser user) where T : BaseAuditableEntity
    //{
    //    if (entity.CreatedBy != user.Id)
    //    {
    //        throw new UnauthorizedAccessException();
    //    }
    //}
}
