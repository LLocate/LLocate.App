using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LLocate.Application.Common.Extensions;
using LLocate.Application.Common.Interfaces;
using LLocate.Application.Goals.Queries;
using LLocate.Application.Sheets.DTOs;
using LLocate.Domain.Entities.Goals;
using LLocate.Domain.Entities.Sheets;
using LLocate.Domain.Enums;

namespace LLocate.Application.Sheets.Queries;
public class GetSheetQuery : IRequest<GetSheetDto>
{
    public int Year { get; set; }
    public int Month { get; set; }
}

public class GetSheetQueryHandler : IRequestHandler<GetSheetQuery, GetSheetDto>
{
    private readonly IApplicationDbContext _context;
    private readonly IUser _user;

    public GetSheetQueryHandler(IApplicationDbContext context, IUser user)
    {
        _context = context;
        _user = user;
    }

    public async Task<GetSheetDto> Handle(GetSheetQuery request, CancellationToken cancellationToken)
    {
        var sheet = await _context.Sheets.FilterByUserId(_user.Id ?? string.Empty)
            .Where(x => !x.IsDeleted
                    && x.Month == request.Month && x.Year == request.Year)
            .AsNoTracking().FirstOrDefaultAsync(cancellationToken);

        if (sheet == null)
        {
            return new GetSheetDto();
        }
        var sheetItems = await _context.SheetItems.FilterByUserId(_user.Id ?? string.Empty)
            .Where(x => !x.IsDeleted
                    && x.Month == request.Month && x.Year == request.Year)
            .Include(x => x.SheetItemEntries).OrderBy(x => x.IsCompleted)
            .AsNoTracking().ToListAsync(cancellationToken);

        return new GetSheetDto { 
            Earnings = sheetItems.Where(x => x.EntryType == SheetItemEntryType.Earning).ToList(), 
            Payments = sheetItems.Where(x => x.EntryType == SheetItemEntryType.Payment).ToList(), 
            Sheet = sheet };
    }
}
