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
public class GetAllSheetItemSettingsQuery : IRequest<List<SheetItemSetting>>
{
    public bool? IsInstallment { get; set; }
}

public class GetAllSheetItemSettingsQueryHandler : IRequestHandler<GetAllSheetItemSettingsQuery, List<SheetItemSetting>>
{
    private readonly IApplicationDbContext _context;
    private readonly IUser _user;

    public GetAllSheetItemSettingsQueryHandler(IApplicationDbContext context, IUser user)
    {
        _context = context;
        _user = user;
    }

    public async Task<List<SheetItemSetting>> Handle(GetAllSheetItemSettingsQuery request, CancellationToken cancellationToken)
    {
        var result = await _context.SheetItemSettings.FilterByUserId(_user.Id ?? string.Empty)
            .Where(x => !x.IsDeleted && !request.IsInstallment.HasValue ? true : x.IsInstallment == request.IsInstallment)
            .AsNoTracking().ToListAsync(cancellationToken);

        return result;
    }
}