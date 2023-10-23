using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LLocate.Application.Common.Interfaces;
using LLocate.Domain.Entities.Sheets;

namespace LLocate.Application.Sheets.Commands;
public class UpdateSheetSettingCommand : IRequest<SheetSetting>
{
    public SheetSetting Model { get; set; } = new SheetSetting();
}

public class UpdateSheetSettingCommandHandler : IRequestHandler<UpdateSheetSettingCommand, SheetSetting>
{
    private readonly IApplicationDbContext _context;
    private readonly IUser _user;

    public UpdateSheetSettingCommandHandler(IApplicationDbContext context, IUser user)
    {
        _context = context;
        _user = user;
    }

    public async Task<SheetSetting> Handle(UpdateSheetSettingCommand request, CancellationToken cancellationToken)
    {
        var entity = request.Model;
        if (entity.Id > 0)
        {
            _context.SheetSettings.Update(entity);
            await _context.SaveChangesAsync(cancellationToken);
        }

        return entity;
    }
}