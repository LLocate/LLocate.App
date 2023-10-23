using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LLocate.Domain.Entities.Goals;
public class GoalSetting : BaseAuditableEntity
{
    public decimal AccountStartingBalance { get; set; }
    public decimal ExcludedAmount { get; set; }
    public string ExcludedAmountRemarks { get; set; } = string.Empty;
}
