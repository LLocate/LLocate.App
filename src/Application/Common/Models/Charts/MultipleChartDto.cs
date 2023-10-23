using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LLocate.Application.Common.Models.Charts;

public class MultipleChartDto
{
    public MultipleChartDto(string name)
    {
        Name = name;
        Series = new List<SingleChartDto>();
    }
    public string? Name { get; set; }
    public List<SingleChartDto>? Series { get; set; }
}
