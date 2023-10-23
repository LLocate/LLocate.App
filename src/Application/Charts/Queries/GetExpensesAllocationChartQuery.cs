using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LLocate.Application.Common.Extensions;
using LLocate.Application.Common.Interfaces;
using LLocate.Application.Common.Models.Charts;
using LLocate.Application.Sheets.DTOs;
using LLocate.Application.Sheets.Queries;
using LLocate.Domain.Enums;

namespace LLocate.Application.Charts.Queries;
public class GetExpensesAllocationChartQuery : IRequest<List<SingleChartDto>>
{
    public int Year { get; set; }
    public int Month { get; set; }
}

public class GetExpensesAllocationChartQueryHandler : IRequestHandler<GetExpensesAllocationChartQuery, List<SingleChartDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly IUser _user;

    public GetExpensesAllocationChartQueryHandler(IApplicationDbContext context, IUser user)
    {
        _context = context;
        _user = user;
    }

    public async Task<List<SingleChartDto>> Handle(GetExpensesAllocationChartQuery request, CancellationToken cancellationToken)
    {
        var returnModels = new List<SingleChartDto>();

        var sheet = await _context.Sheets.FilterByUserId(_user.Id ?? string.Empty)
            .Where(x => !x.IsDeleted
                    && x.Month == request.Month && x.Year == request.Year)
            .AsNoTracking().FirstOrDefaultAsync(cancellationToken);

        if (sheet == null)
        {
            return returnModels;
        }
        var sheetItems = await _context.SheetItems.FilterByUserId(_user.Id ?? string.Empty)
            .Where(x => !x.IsDeleted && x.EntryType == SheetItemEntryType.Payment
                    && x.Month == request.Month && x.Year == request.Year)
            .AsNoTracking().ToListAsync(cancellationToken);

        var grouped = sheetItems.GroupBy(x => x.Category).ToList();
        foreach(var group in grouped)
        {
            returnModels.Add(new SingleChartDto
            {
                Name = group.Key.ToString(),
                Value = group.Sum(x => x.Allocated)
            });
        }

        returnModels = returnModels.OrderBy(x => x.Name == SheetItemCategory.Needs.ToString() ? 0
                                               : x.Name == SheetItemCategory.Wants.ToString() ? 1
                                               : x.Name == SheetItemCategory.Savings.ToString() ? 2 : 3)
            .ThenBy(x => x.Name)
            .ToList();
        return returnModels;
    }
}
