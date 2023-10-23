using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LLocate.Application.Common.Extensions;
using LLocate.Application.Common.Interfaces;
using LLocate.Domain.Entities.Sheets;
using LLocate.Domain.Enums;

namespace LLocate.Application.Sheets.Commands;
public class UpsertSheetItemCommand : IRequest<SheetItem>
{
    public SheetItem Model { get; set; } = new SheetItem();

}

public class UpsertSheetItemCommandHandler : IRequestHandler<UpsertSheetItemCommand, SheetItem>
{
    private readonly IApplicationDbContext _context;
    private readonly IUser _user;

    public UpsertSheetItemCommandHandler(IApplicationDbContext context, IUser user)
    {
        _context = context;
        _user = user;
    }

    public async Task<SheetItem> Handle(UpsertSheetItemCommand request, CancellationToken cancellationToken)
    {
        var entity = request.Model;
        if(entity.Month <= 0 || entity.Year <= 0)
        {
            throw new Exception("Invalid Month/Year");
        }
        if (entity.Id > 0)
        {
            _context.SheetItems.Update(entity);
        }
        else
        {
            await _context.SheetItems.AddAsync(entity, cancellationToken);
        }

        await _context.SaveChangesAsync(cancellationToken);

        var sheet = await _context.Sheets.FilterByUserId(_user.Id ?? string.Empty).Where(x => x.Month == entity.Month && x.Year == entity.Year).FirstOrDefaultAsync(cancellationToken);
        var sheetItems = await _context.SheetItems.FilterByUserId(_user.Id ?? string.Empty).Where(x => x.Month == entity.Month && x.Year == entity.Year).AsNoTracking().ToListAsync(cancellationToken);
        if (sheet != null)
        {

            sheet.IncomingEarning = sheetItems.Where(x => x.EntryType == SheetItemEntryType.Earning).Sum(x => x.Allocated)
                - sheetItems.Where(x => x.EntryType == SheetItemEntryType.Earning).Sum(x => x.Fulfilled);

            sheet.IncomingExpenses = sheetItems.Where(x => x.EntryType == SheetItemEntryType.Payment).Sum(x => x.Allocated)
                - sheetItems.Where(x => x.EntryType == SheetItemEntryType.Payment).Sum(x => x.Fulfilled);

            sheet.TotalEarning = sheetItems.Where(x => x.EntryType == SheetItemEntryType.Earning).Sum(x => x.Fulfilled);

            sheet.TotalExpenses = sheetItems.Where(x => x.EntryType == SheetItemEntryType.Payment).Sum(x => x.Fulfilled);

            sheet.CurrentBalance = sheetItems.Where(x => x.EntryType == SheetItemEntryType.Earning).Sum(x => x.Fulfilled)
                - sheetItems.Where(x => x.EntryType == SheetItemEntryType.Payment).Sum(x => x.Fulfilled);

            await _context.SaveChangesAsync(cancellationToken);
        }

        return entity;
    }
}