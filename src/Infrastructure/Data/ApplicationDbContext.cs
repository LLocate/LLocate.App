using System.Reflection;
using LLocate.Application.Common.Interfaces;
using LLocate.Domain.Entities;
using LLocate.Infrastructure.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using LLocate.Domain.Entities.Sheets;
using LLocate.Domain.Entities.Goals;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;
using Microsoft.Extensions.Hosting;
using System.Reflection.Emit;

namespace LLocate.Infrastructure.Data;

//dotnet ef migrations add "OnboardingFlag" --project src\Infrastructure --startup-project src\Web --output-dir Data\Migrations
public class ApplicationDbContext : IdentityDbContext<ApplicationUser>, IApplicationDbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

    public DbSet<TodoList> TodoLists => Set<TodoList>();

    public DbSet<TodoItem> TodoItems => Set<TodoItem>();

    public DbSet<Entry> Entries => Set<Entry>();
    public DbSet<Goal> Goals => Set<Goal>();
    public DbSet<GoalSetting> GoalSettings => Set<GoalSetting>();
    public DbSet<GoalEntry> GoalEntries => Set<GoalEntry>();

    public DbSet<Sheet> Sheets => Set<Sheet>();
    public DbSet<SheetItem> SheetItems => Set<SheetItem>();
    public DbSet<SheetItemEntry> SheetItemEntries => Set<SheetItemEntry>();
    public DbSet<SheetItemSetting> SheetItemSettings => Set<SheetItemSetting>();
    public DbSet<SheetSetting> SheetSettings => Set<SheetSetting>();

    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

        base.OnModelCreating(builder);

        foreach (var property in builder.Model.GetEntityTypes()
                .SelectMany(t => t.GetProperties())
                .Where(p => p.ClrType == typeof(decimal) || p.ClrType == typeof(decimal?)))
        {
            property.SetColumnType("decimal(18,2)");
        }

        builder.Entity<Goal>()
        .HasMany(e => e.Entries)
        .WithMany(e => e.Goals)
        .UsingEntity<GoalEntry>(
            l => l.HasOne<Entry>().WithMany().HasForeignKey(e => e.EntryId),
            r => r.HasOne<Goal>().WithMany().HasForeignKey(e => e.GoalId));

        builder.Entity<GoalEntry>()
            .HasOne(ge => ge.Goal)
            .WithMany(g => g.GoalEntries)
            .HasForeignKey(ge => ge.GoalId);

        builder.Entity<GoalEntry>()
            .HasOne(ge => ge.Entry)
            .WithMany(g => g.GoalEntries)
            .HasForeignKey(ge => ge.EntryId);
    }
}
