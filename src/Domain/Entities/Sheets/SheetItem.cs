using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LLocate.Domain.Entities.Sheets;
public class SheetItem : BaseAuditableEntity
{
    public int Year { get; set; }
    public int Month { get; set; }

    public string Name { get; set; } = string.Empty;
    public SheetItemCategory Category { get; set; }
    public SheetItemEntryType EntryType { get; set; }
    public string Description { get; set; } = string.Empty;
    public decimal Allocated { get; set; } = decimal.Zero;
    public decimal Fulfilled { get; set; } = decimal.Zero;
    public bool IsCompleted { get; set; }

    public List<SheetItemEntry> SheetItemEntries { get; set; } = new List<SheetItemEntry>();
}
