using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LLocate.Domain.Entities.Sheets;
public class Sheet : BaseAuditableEntity
{
    public int Year { get; set; }
    public int Month { get; set; }

    public decimal CurrentBalance { get; set; }
    public decimal IncomingExpenses { get; set; }
    public decimal IncomingEarning { get; set; }
    public decimal TotalExpenses { get; set; }
    public decimal TotalEarning { get; set; }
}
