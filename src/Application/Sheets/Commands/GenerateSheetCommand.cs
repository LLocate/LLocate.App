using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LLocate.Application.Common.Extensions;
using LLocate.Application.Common.Helpers;
using LLocate.Application.Common.Interfaces;
using LLocate.Application.Goals.Commands;
using LLocate.Domain.Entities.Goals;
using LLocate.Domain.Entities.Sheets;
using LLocate.Domain.Enums;

namespace LLocate.Application.Sheets.Commands;
public class GenerateSheetCommand : IRequest<bool>
{
    public int Year { get; set; }
    public int Month { get; set; }
}

public class GenerateSheetCommandHandler : IRequestHandler<GenerateSheetCommand, bool>
{
    private readonly IApplicationDbContext _context;
    private readonly IUser _user;

    public GenerateSheetCommandHandler(IApplicationDbContext context, IUser user)
    {
        _context = context;
        _user = user;
    }

    public async Task<bool> Handle(GenerateSheetCommand request, CancellationToken cancellationToken)
    {
        var result = await _context.Sheets
            .FilterByUserId(_user.Id ?? string.Empty)
            .FirstOrDefaultAsync(x => x.Year == request.Year && x.Month == request.Month);

        if (result != null)
        {
            throw new Exception("Sheet Already Exists!");
        }
        result = new Sheet();
        result.Month = request.Month;
        result.Year = request.Year;


        var sheetItemSettings = await _context.SheetItemSettings
            .FilterByUserId(_user.Id ?? string.Empty)
            .Where(x => !x.IsDeleted && !x.IsDeactivated).ToListAsync(cancellationToken);

        var nonInstallmentItems = sheetItemSettings
            .Where(x => !x.IsInstallment).ToList();

        var installmentItems = sheetItemSettings
            .Where(x => x.IsInstallment).ToList();

        var sheetItemsToCreate = new List<SheetItem>();
        sheetItemsToCreate.AddRange(nonInstallmentItems.Select(x => new SheetItem
        {
            Year = request.Year,
            Month = request.Month,
            Name = x.Name,
            Category = x.Category,
            EntryType = x.EntryType,
            Description = x.Description,
            Allocated = x.Allocated,
        }));

        foreach(var item in installmentItems)
        {
            var installment = SheetHelper.IsInInstallmentPeriod(item, request.Year, request.Month);
            if(installment.isInPeriod)
            {
                sheetItemsToCreate.Add(new SheetItem
                {
                    Year = request.Year,
                    Month = request.Month,
                    Name = $"{item.Name} ({ installment.currentMonth }/{installment.totalMonths})" ,
                    Category = item.Category,
                    EntryType = item.EntryType,
                    Description = item.Description,
                    Allocated = item.Allocated,
                });
            }
        }

        result.IncomingEarning = sheetItemsToCreate.Where(x => x.EntryType == SheetItemEntryType.Earning).Sum(x => x.Allocated)
                - sheetItemsToCreate.Where(x => x.EntryType == SheetItemEntryType.Earning).Sum(x => x.Fulfilled);

        result.IncomingExpenses = sheetItemsToCreate.Where(x => x.EntryType == SheetItemEntryType.Payment).Sum(x => x.Allocated)
            - sheetItemsToCreate.Where(x => x.EntryType == SheetItemEntryType.Payment).Sum(x => x.Fulfilled);

        result.TotalEarning = sheetItemsToCreate.Where(x => x.EntryType == SheetItemEntryType.Earning).Sum(x => x.Fulfilled);

        result.TotalExpenses = sheetItemsToCreate.Where(x => x.EntryType == SheetItemEntryType.Payment).Sum(x => x.Fulfilled);

        result.CurrentBalance = sheetItemsToCreate.Where(x => x.EntryType == SheetItemEntryType.Earning).Sum(x => x.Fulfilled)
            - sheetItemsToCreate.Where(x => x.EntryType == SheetItemEntryType.Payment).Sum(x => x.Fulfilled);

        await _context.Sheets.AddAsync(result, cancellationToken);
        await _context.SheetItems.AddRangeAsync(sheetItemsToCreate);
        await _context.SaveChangesAsync(cancellationToken);

        return true;
    }
}
