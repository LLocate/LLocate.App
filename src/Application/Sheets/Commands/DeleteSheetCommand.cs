using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LLocate.Application.Common.Extensions;
using LLocate.Application.Common.Interfaces;
using LLocate.Application.Sheets.DTOs;
using LLocate.Application.Sheets.Queries;
using LLocate.Domain.Enums;

namespace LLocate.Application.Sheets.Commands;
public class DeleteSheetCommand : IRequest<bool>
{
    public int Year { get; set; }
    public int Month { get; set; }
}

public class DeleteSheetCommandHandler : IRequestHandler<DeleteSheetCommand, bool>
{
    private readonly IApplicationDbContext _context;
    private readonly IUser _user;

    public DeleteSheetCommandHandler(IApplicationDbContext context, IUser user)
    {
        _context = context;
        _user = user;
    }

    public async Task<bool> Handle(DeleteSheetCommand request, CancellationToken cancellationToken)
    {
        var sheet = await _context.Sheets.FilterByUserId(_user.Id ?? string.Empty)
            .Where(x => !x.IsDeleted
                    && x.Month == request.Month && x.Year == request.Year)
            //.AsNoTracking()
            .FirstOrDefaultAsync(cancellationToken);

        if (sheet == null)
        {
            return true;
        }
        _context.Sheets.Remove(sheet);
        //sheet.IsDeleted = true;
        var sheetItems = await _context.SheetItems.FilterByUserId(_user.Id ?? string.Empty)
            .Where(x => !x.IsDeleted
                    && x.Month == request.Month && x.Year == request.Year)
            .Include(x => x.SheetItemEntries).OrderBy(x => x.IsCompleted)
            //.AsNoTracking()
            .ToListAsync(cancellationToken);
        //foreach(var item in sheetItems )
        //{
        //    foreach (var entry in item.SheetItemEntries)
        //    {
        //        entry.IsDeleted = true;
        //    }
        //    item.IsDeleted = true;
        //}
        _context.SheetItems.RemoveRange(sheetItems);
        await _context.SaveChangesAsync(cancellationToken);

        return true;
    }
}
