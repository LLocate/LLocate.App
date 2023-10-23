using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LLocate.Domain.Entities.Goals;
public class GoalEntry
{
    public int EntryId { get; set; }
    public Entry Entry { get; set; } = new Entry();
    public int GoalId { get; set; }
    public Goal Goal { get; set; } = new Goal();
    public decimal Amount { get; set; }

}
