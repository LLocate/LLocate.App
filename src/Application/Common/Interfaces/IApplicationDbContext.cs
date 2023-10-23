using LLocate.Domain.Entities;
using LLocate.Domain.Entities.Goals;
using LLocate.Domain.Entities.Sheets;

namespace LLocate.Application.Common.Interfaces;

public interface IApplicationDbContext
{
    DbSet<TodoList> TodoLists { get; }

    DbSet<TodoItem> TodoItems { get; }

    DbSet<Entry> Entries { get;}
    DbSet<Goal> Goals { get;}
    DbSet<GoalSetting> GoalSettings { get;}
    DbSet<GoalEntry> GoalEntries { get;}
    DbSet<Sheet> Sheets { get;}
    DbSet<SheetItem> SheetItems { get;}
    DbSet<SheetItemSetting> SheetItemSettings { get;}
    DbSet<SheetItemEntry> SheetItemEntries { get; }
    DbSet<SheetSetting> SheetSettings { get; }
    Task<int> SaveChangesAsync(CancellationToken cancellationToken);
}
