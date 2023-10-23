using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LLocate.Domain.Enums;

namespace LLocate.Application.Goals.DTOs;
public class GoalSummaryDto
{
    public decimal CurrentBalance { get; set; }
    public List<GoalSummaryItemDto> Items { get; set; } = new List<GoalSummaryItemDto>();
}

public class GoalSummaryItemDto
{
    public int Id { get; set; }
    public GoalType Type { get; set; }
    public string Name { get; set; } = string.Empty;
    public DateTime? StartDate { get; set; } = null;
    public DateTime? TargetDate { get; set; } = null;
    public decimal TargetAmount { get; set; }
    public bool IsDeactivated { get; set; }

    public decimal Accumulated { get; set; }
    public decimal Utilized { get; set; }
    public decimal AvailableToSpend { get
        {
            return Accumulated - Utilized;
        }
    }

}
