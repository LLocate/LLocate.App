using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LLocate.Domain.Entities.Sheets;

namespace LLocate.Application.Sheets.DTOs;
public class GetSheetDto
{
    public Sheet Sheet { get; set; } = new Sheet();
    public List<SheetItem> Payments { get; set; } = new List<SheetItem>();
    public List<SheetItem> Earnings { get; set; } = new List<SheetItem>();
}
