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
public class GetValidSheetItemSettingsQuery : IRequest<List<SheetItemSetting>>
{
    public bool? IsInstallment { get; set; }
}

public class GetValidSheetItemSettingsQueryHandler : IRequestHandler<GetValidSheetItemSettingsQuery, List<SheetItemSetting>>
{
    private readonly IApplicationDbContext _context;
    private readonly IUser _user;

    public GetValidSheetItemSettingsQueryHandler(IApplicationDbContext context, IUser user)
    {
        _context = context;
        _user = user;
    }

    public async Task<List<SheetItemSetting>> Handle(GetValidSheetItemSettingsQuery request, CancellationToken cancellationToken)
    {
        var result = await _context.SheetItemSettings
            .FilterByUserId(_user.Id ?? string.Empty)
            .Where(x => !x.IsDeleted && !x.IsDeactivated && !request.IsInstallment.HasValue ? true : x.IsInstallment == request.IsInstallment)
            .AsNoTracking().ToListAsync(cancellationToken);

        return result;
    }
}