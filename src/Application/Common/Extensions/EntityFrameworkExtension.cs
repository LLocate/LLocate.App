using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LLocate.Domain.Common;

namespace LLocate.Application.Common.Extensions;
public static class EntityFrameworkExtensions
{
    public static IQueryable<TEntity> FilterByUserId<TEntity>(
        this IQueryable<TEntity> source,
        string userId)
        where TEntity : BaseAuditableEntity
    {
        if (source == null)
        {
            throw new ArgumentNullException(nameof(source));
        }

        // Assuming your entity has a UserId property (adjust accordingly)
        return source.Where(entity => entity.CreatedBy == userId);
    }
}