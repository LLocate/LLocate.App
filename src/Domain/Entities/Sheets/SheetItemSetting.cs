using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LLocate.Domain.Entities.Sheets;
public class SheetItemSetting : BaseAuditableEntity
{
    public string Name { get; set; } = string.Empty;
    public SheetItemCategory Category { get; set; }
    public SheetItemEntryType EntryType { get; set; }
    public string Description { get; set; } = string.Empty;
    public decimal Allocated { get; set; } = decimal.Zero;
    public bool IsInstallment { get; set; }
    public int? InstallmentStartYear { get; set; }
    public int? InstallmentStartMonth { get; set; }
    public int? InstallmentEndYear { get; set; }
    public int? InstallmentEndMonth { get; set; }

    public bool IsDeactivated { get; set; }

}
