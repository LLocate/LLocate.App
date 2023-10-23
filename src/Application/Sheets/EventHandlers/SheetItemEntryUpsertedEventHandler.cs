using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using LLocate.Application.Common.Extensions;
using LLocate.Application.Common.Interfaces;
using LLocate.Application.TodoItems.EventHandlers;
using LLocate.Domain.Enums;
using LLocate.Domain.Events;

namespace LLocate.Application.Sheets.EventHandlers;
public class SheetItemEntryUpsertedEventHandler : INotificationHandler<SheetItemEntryUpsertedEvent>
{
    private readonly ILogger<SheetItemEntryUpsertedEventHandler> _logger;
    private readonly IApplicationDbContext _context;

    public SheetItemEntryUpsertedEventHandler(ILogger<SheetItemEntryUpsertedEventHandler> logger, IApplicationDbContext context)
    {
        _logger = logger;
        _context = context;
    }

    public async Task Handle(SheetItemEntryUpsertedEvent notification, CancellationToken cancellationToken)
    {
        //_logger.LogInformation("LLocate Domain Event: {DomainEvent}", notification.GetType().Name);
        var userId = notification.Item.CreatedBy;
        var sheetItemEntry = notification.Item;

        //calculate sheet item
        var sheetItem = await _context.SheetItems.Include(x => x.SheetItemEntries).FirstOrDefaultAsync(x => x.Id == sheetItemEntry.SheetItemId);
        if(sheetItem == null)
        {
            _logger.LogInformation("LLocate Domain Event: {DomainEvent}, not found", notification.GetType().Name);
            return;
        }
        sheetItem.Fulfilled = sheetItem.SheetItemEntries.Sum(x => x.Amount);
        //calculate sheet
        _context.SheetItems.Update(sheetItem);
        await _context.SaveChangesAsync(cancellationToken);

        var month = sheetItem.Month;
        var year = sheetItem.Year;

        var sheetItems = await _context.SheetItems.FilterByUserId(userId ?? string.Empty).Where(x => x.Month == month && x.Year == year).AsNoTracking().ToListAsync(cancellationToken);
        var sheet = await _context.Sheets.FilterByUserId(userId ?? string.Empty).Where(x => x.Month == month && x.Year == year).FirstOrDefaultAsync(cancellationToken);
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

        return;
    }
}
