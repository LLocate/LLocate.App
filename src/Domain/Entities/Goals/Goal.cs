using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LLocate.Domain.Entities.Goals;
public class Goal : BaseAuditableEntity
{
    public GoalType Type { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public DateTime? StartDate { get; set; } = null;
    public DateTime? TargetDate { get; set; } = null;
    public decimal Amount { get; set; }

    public decimal DefaultContributionPercentage { get; set; }
    public bool IsDeactivated { get; set; }

    public List<Entry> Entries { get; set; } = new();
    public List<GoalEntry> GoalEntries { get; set; } = new();
}
