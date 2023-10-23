using LLocate.Application.Common.Models;
using LLocate.Application.Goals.Commands;
using LLocate.Application.Goals.DTOs;
using LLocate.Application.Goals.Queries;
using LLocate.Application.TodoItems.Commands.CreateTodoItem;
using LLocate.Application.TodoItems.Commands.DeleteTodoItem;
using LLocate.Application.TodoItems.Commands.UpdateTodoItem;
using LLocate.Application.TodoItems.Commands.UpdateTodoItemDetail;
using LLocate.Application.TodoItems.Queries.GetTodoItemsWithPagination;
using LLocate.Domain.Entities.Goals;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace LLocate.Pro.Endpoints;

public class Goals : EndpointGroupBase
{
    public override void Map(WebApplication app)
    {

        app.MapGroup(this)
            .RequireAuthorization()
            .MapGet(GetAllGoals, nameof(GetAllGoals))
            .MapGet(GetValidGoals, nameof(GetValidGoals))
            .MapGet(GetGoalSummary, nameof(GetGoalSummary))
            .MapGet(GetEntries, nameof(GetEntries))
            .MapPost(UpsertGoal, nameof(UpsertGoal))
            .MapPost(UpdateGoalDistribution, nameof(UpdateGoalDistribution))
            .MapPost(UpsertEntry, nameof(UpsertEntry))
            //.MapPut(UpdateTodoItem, "{id}")
            //.MapPut(UpdateTodoItemDetail, "UpdateDetail/{id}")
            //.MapDelete(DeleteTodoItem, "{id}")
            ;
    }

    public async Task<List<Goal>> GetAllGoals(ISender sender, [AsParameters] GetAllGoalQuery query)
    {
        return await sender.Send(query);
    }
    public async Task<List<Goal>> GetValidGoals(ISender sender, [AsParameters] GetValidGoalsQuery query)
    {
        return await sender.Send(query);
    }
    public async Task<GoalSummaryDto> GetGoalSummary(ISender sender, [AsParameters] GetGoalSummaryQuery query)
    {
        return await sender.Send(query);
    }
    public async Task<List<Entry>> GetEntries(ISender sender, [AsParameters] GetEntriesQuery query)
    {
        return await sender.Send(query);
    }

    public async Task<Goal> UpsertGoal(ISender sender, UpsertGoalCommand command)
    {
        return await sender.Send(command);
    }
    
    public async Task<bool> UpdateGoalDistribution(ISender sender, UpdateGoalDistributionCommand command)
    {
        return await sender.Send(command);
    }

    public async Task<bool> DeleteGoal(ISender sender, int id)
    {
        return await sender.Send(new DeleteGoalCommand { Id = id});
    }

    public async Task<Entry> UpsertEntry(ISender sender, UpsertEntryCommand command)
    {
        return await sender.Send(command);
    }

}
