using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LLocate.Application.Common.Interfaces;
using LLocate.Application.Sheets.Commands;
using LLocate.Domain.Entities.Sheets;

namespace LLocate.Application.Sheets.Commands;
public class UpdateSheetCommand : IRequest<Sheet>
{
    public Sheet Model { get; set; } = new Sheet();
}

public class UpdateSheetCommandHandler : IRequestHandler<UpdateSheetCommand, Sheet>
{
    private readonly IApplicationDbContext _context;
    private readonly IUser _user;

    public UpdateSheetCommandHandler(IApplicationDbContext context, IUser user)
    {
        _context = context;
        _user = user;
    }

    public async Task<Sheet> Handle(UpdateSheetCommand request, CancellationToken cancellationToken)
    {
        var entity = request.Model;
        if (entity.Id > 0)
        {
            _context.Sheets.Update(entity);
            await _context.SaveChangesAsync(cancellationToken);
        }

        return entity;
    }
}