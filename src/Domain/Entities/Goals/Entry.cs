using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LLocate.Domain.Entities.Goals;
public class Entry : BaseAuditableEntity
{
    public EntryType Type { get; set; }
    public DateTime TransactionDate { get; set; } = DateTime.Now;
    public string Name { get; set; } = string.Empty;
    public decimal Amount { get; set; }
    public List<Goal> Goals { get; set; } = new();
    public List<GoalEntry> GoalEntries { get; set; } = new();
}
