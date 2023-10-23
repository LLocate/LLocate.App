using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LLocate.Application.Common.Interfaces;
using LLocate.Domain.Entities.Goals;
using LLocate.Domain.Entities.Sheets;
using LLocate.Domain.Events;

namespace LLocate.Application.Sheets.Commands;
public class UpsertSheetItemEntryCommand : IRequest<SheetItemEntry>
{
    public SheetItemEntry Model { get; set; } = new SheetItemEntry();
    public bool IsSheetItemCompleted { get; set; } = false;

}

public class UpsertSheetItemEntryCommandHandler : IRequestHandler<UpsertSheetItemEntryCommand, SheetItemEntry>
{
    private readonly IApplicationDbContext _context;
    private readonly IUser _user;

    public UpsertSheetItemEntryCommandHandler(IApplicationDbContext context, IUser user)
    {
        _context = context;
        _user = user;
    }

    public async Task<SheetItemEntry> Handle(UpsertSheetItemEntryCommand request, CancellationToken cancellationToken)
    {
        var entity = request.Model;
        entity.SheetItem = null;
        if (entity.Id > 0)
        {
            _context.SheetItemEntries.Update(entity);
        }
        else
        {
            await _context.SheetItemEntries.AddAsync(entity, cancellationToken);
        }

        if(request.IsSheetItemCompleted)
        {
            var sheetItem = await _context.SheetItems.FirstOrDefaultAsync(x => x.Id == entity.SheetItemId);
            if (sheetItem != null)
            {
                sheetItem.IsCompleted = true;
            }
        }

        entity.AddDomainEvent(new SheetItemEntryUpsertedEvent(entity));
        await _context.SaveChangesAsync(cancellationToken);

        return entity;
    }
}