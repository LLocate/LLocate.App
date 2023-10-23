using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LLocate.Domain.Entities.Sheets;

namespace LLocate.Domain.Events;
public class SheetItemEntryUpsertedEvent : BaseEvent
{
    public SheetItemEntryUpsertedEvent(SheetItemEntry entry)
    {
        Item = entry;
    }
    public SheetItemEntry Item { get; }
}
