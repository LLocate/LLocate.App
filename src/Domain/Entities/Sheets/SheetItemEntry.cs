using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LLocate.Domain.Entities.Sheets;
public class SheetItemEntry : BaseAuditableEntity
{
    public SheetItem? SheetItem { get; set; } = new SheetItem();
    public int SheetItemId { get; set; }

    public DateTime TransactionDate { get; set; }

    public string Description { get; set; } = string.Empty;
    public decimal Amount { get; set; } = 0;
}
