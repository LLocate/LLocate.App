using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LLocate.Application.Common.Extensions;
using LLocate.Application.Common.Interfaces;
using LLocate.Domain.Entities.Sheets;

namespace LLocate.Application.Sheets.Commands;
public class DeleteSheetItemSettingCommand : IRequest<bool>
{
    public int Id { get; set; }
}

public class DeleteSheetItemSettingCommandHandler : IRequestHandler<DeleteSheetItemSettingCommand, bool>
{
    private readonly IApplicationDbContext _context;
    private readonly IUser _user;

    public DeleteSheetItemSettingCommandHandler(IApplicationDbContext context, IUser user)
    {
        _context = context;
        _user = user;
    }

    public async Task<bool> Handle(DeleteSheetItemSettingCommand request, CancellationToken cancellationToken)
    {
        var id = request.Id;
        var itemToDelete = await _context.SheetItemSettings.FilterByUserId(_user.Id ?? string.Empty).AsNoTracking().FirstOrDefaultAsync(x => x.Id == id);
        if (itemToDelete != null && itemToDelete.Id > 0)
        {
            _context.SheetItemSettings.Remove(itemToDelete);
            await _context.SaveChangesAsync(cancellationToken);
        }

        return true;
    }
}