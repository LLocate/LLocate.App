using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LLocate.Application.Common.Extensions;
using LLocate.Application.Common.Interfaces;
using LLocate.Application.Goals.Queries;
using LLocate.Domain.Entities.Goals;
using LLocate.Domain.Entities.Sheets;

namespace LLocate.Application.Sheets.Queries;
public class GetSheetSettingQuery : IRequest<SheetSetting>
{
}

public class GetSheetSettingQueryHandler : IRequestHandler<GetSheetSettingQuery, SheetSetting>
{
    private readonly IApplicationDbContext _context;
    private readonly IUser _user;

    public GetSheetSettingQueryHandler(IApplicationDbContext context, IUser user)
    {
        _context = context;
        _user = user;
    }

    public async Task<SheetSetting> Handle(GetSheetSettingQuery request, CancellationToken cancellationToken)
    {
        var result = await _context.SheetSettings.FilterByUserId(_user.Id ?? string.Empty).AsNoTracking().FirstOrDefaultAsync(cancellationToken);
        if (result == null)
        {
            result = new SheetSetting();
            await _context.SheetSettings.AddAsync(result);
            await _context.SaveChangesAsync(cancellationToken);
        }
        return result;
    }
}

