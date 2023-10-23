using LLocate.Application.Charts.Queries;
using LLocate.Application.Common.Models;
using LLocate.Application.Common.Models.Charts;
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

public class Charts : EndpointGroupBase
{
    public override void Map(WebApplication app)
    {

        app.MapGroup(this)
            .RequireAuthorization()
            .MapGet(GetExpensesAllocationChart, nameof(GetExpensesAllocationChart))
            ;
    }

    public async Task<List<SingleChartDto>> GetExpensesAllocationChart(ISender sender, [AsParameters] GetExpensesAllocationChartQuery query)
    {
        return await sender.Send(query);
    }

}
