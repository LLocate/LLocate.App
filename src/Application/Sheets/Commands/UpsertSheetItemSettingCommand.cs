using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LLocate.Application.Common.Interfaces;
using LLocate.Domain.Entities.Sheets;
using LLocate.Domain.Enums;

namespace LLocate.Application.Sheets.Commands;
public class UpsertSheetItemSettingCommand : IRequest<SheetItemSetting>
{
    public SheetItemSetting Model { get; set; } = new SheetItemSetting();

    public int Month { get; set; }
    public int Year { get; set; }
}

public class UpsertSheetItemSettingCommandHandler : IRequestHandler<UpsertSheetItemSettingCommand, SheetItemSetting>
{
    private readonly IApplicationDbContext _context;
    private readonly IUser _user;

    public UpsertSheetItemSettingCommandHandler(IApplicationDbContext context, IUser user)
    {
        _context = context;
        _user = user;
    }

    public async Task<SheetItemSetting> Handle(UpsertSheetItemSettingCommand request, CancellationToken cancellationToken)
    {
        var entity = request.Model;
        if(entity.EntryType == SheetItemEntryType.Earning)
        {
            entity.Category = SheetItemCategory.None;
        }
        if (entity.Id > 0)
        {
            _context.SheetItemSettings.Update(entity);
        }
        else
        {
            await _context.SheetItemSettings.AddAsync(entity, cancellationToken);
        }

        await _context.SaveChangesAsync(cancellationToken);

        return entity;
    }
}