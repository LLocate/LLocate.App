using LLocate.Application.Common.Models;
using LLocate.Application.Goals.Commands;
using LLocate.Application.Goals.DTOs;
using LLocate.Application.Goals.Queries;
using LLocate.Application.TodoItems.Commands.CreateTodoItem;
using LLocate.Application.TodoItems.Commands.DeleteTodoItem;
using LLocate.Application.TodoItems.Commands.UpdateTodoItem;
using LLocate.Application.TodoItems.Commands.UpdateTodoItemDetail;
using LLocate.Application.TodoItems.Queries.GetTodoItemsWithPagination;
using LLocate.Application.Users.DTOs;
using LLocate.Application.Users.Queries;
using LLocate.Domain.Entities.Goals;

namespace LLocate.Pro.Endpoints;

public class Users : EndpointGroupBase
{
    public override void Map(WebApplication app)
    {
        app.MapGroup(this)
            .MapGet(GetUser, nameof(GetUser))
            ;
    }

    public async Task<GetUserDto> GetUser(ISender sender, [AsParameters] GetUserQuery query)
    {
        return await sender.Send(query);
    }

}
