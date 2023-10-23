using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LLocate.Domain.Entities.Sheets;
public class SheetSetting : BaseAuditableEntity
{
    public SheetSettingType Type { get; set; }
    public int CurrentSheetId { get; set; }
    public string CurrencyCode { get; set; } = "MYR";
}
