using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LLocate.Application.Common.Extensions;
using LLocate.Application.Common.Interfaces;
using LLocate.Domain.Entities.Goals;
using LLocate.Domain.Entities.Sheets;
using LLocate.Domain.Enums;
using static System.Net.Mime.MediaTypeNames;

namespace LLocate.Application.Goals.Commands;
public class UpsertEntryCommand : IRequest<Entry>
{
    public Entry Model { get; set; } = new Entry();
    public List<GoalEntry> GoalEntries { get; set; } = new List<GoalEntry>();

    public Sheet? Sheet { get; set; } = null;
}

public class UpsertEntryCommandHandler : IRequestHandler<UpsertEntryCommand, Entry>
{
    private readonly IApplicationDbContext _context;
    private readonly IUser _user;

    public UpsertEntryCommandHandler(IApplicationDbContext context, IUser user)
    {
        _context = context;
        _user = user;
    }

    public async Task<Entry> Handle(UpsertEntryCommand request, CancellationToken cancellationToken)
    {
        var entity = request.Model ?? new Entry();
        if (entity.Id > 0)
        {
            var result = _context.Entries.FilterByUserId(_user.Id ?? string.Empty).FirstOrDefaultAsync(x => x.Id == entity.Id);
            _context.Entries.Update(entity);
        }
        else
        {
            var goalIds = request.GoalEntries.Select(x => x.GoalId).ToList();
            var goals = await _context.Goals.FilterByUserId(_user.Id ?? string.Empty).Where(x => goalIds.Contains(x.Id)).ToListAsync(cancellationToken);
            foreach(var entry in request.GoalEntries) {
                entry.Entry = entity;
                entry.Goal = goals.First(x => x.Id == entry.GoalId);
                entry.GoalId = 0;
                entity.GoalEntries.Add(entry);
            }
            await _context.Entries.AddAsync(entity, cancellationToken);

            if(request.Sheet != null)
            {
                var sheetItem = new SheetItem
                {
                    Year = request.Sheet.Year,
                    Month = request.Sheet.Month,
                    EntryType = SheetItemEntryType.Payment,
                    Category = SheetItemCategory.Savings,
                    Allocated = entity.Amount,
                    Fulfilled = entity.Amount,
                    Name = $"Contribution from {request.Sheet.Month}/{request.Sheet.Year}",
                    IsCompleted = true,
                    SheetItemEntries = new List<SheetItemEntry>
                    {
                        new SheetItemEntry
                        {
                            Amount = entity.Amount,
                            Description = $"Contribution from {request.Sheet.Month}/{request.Sheet.Year}",
                            TransactionDate = entity.TransactionDate
                        }
                    }
                };
                await _context.SheetItems.AddAsync(sheetItem, cancellationToken);
            }
        }

        await _context.SaveChangesAsync(cancellationToken);

        if (request.Sheet != null)
        {
            var sheet = await _context.Sheets.FilterByUserId(_user.Id ?? string.Empty).Where(x => x.Month == request.Sheet.Month && x.Year == request.Sheet.Year).FirstOrDefaultAsync(cancellationToken);
            var sheetItems = await _context.SheetItems.FilterByUserId(_user.Id ?? string.Empty).Where(x => x.Month == request.Sheet.Month && x.Year == request.Sheet.Year).AsNoTracking().ToListAsync(cancellationToken);
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
        }

        return entity;
    }
}
