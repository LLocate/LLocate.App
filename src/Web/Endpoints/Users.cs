using LLocate.Application.Common.Models;
using LLocate.Application.Goals.Commands;
using LLocate.Application.Goals.DTOs;
using LLocate.Application.Goals.Queries;
using LLocate.Application.Sheets.Commands;
using LLocate.Application.TodoItems.Commands.CreateTodoItem;
using LLocate.Application.TodoItems.Commands.DeleteTodoItem;
using LLocate.Application.TodoItems.Commands.UpdateTodoItem;
using LLocate.Application.TodoItems.Commands.UpdateTodoItemDetail;
using LLocate.Application.TodoItems.Queries.GetTodoItemsWithPagination;
using LLocate.Application.Users.Commands;
using LLocate.Application.Users.DTOs;
using LLocate.Application.Users.Queries;
using LLocate.Domain.Entities.Goals;
using LLocate.Domain.Entities.Sheets;

namespace LLocate.Pro.Endpoints;

public class Users : EndpointGroupBase
{
    public override void Map(WebApplication app)
    {
        app.MapGroup(this)
            .MapGet(GetUser, nameof(GetUser))
            .MapPut(SetCompleteOnboarding, nameof(SetCompleteOnboarding))
            .MapPut(SetCompleteWalkthrough, nameof(SetCompleteWalkthrough))
            .MapPut(SetDefaultTheme, nameof(SetDefaultTheme))
            .MapPut(SetDefaultCurrency, nameof(SetDefaultCurrency))
            .MapPut(UpdateUser, nameof(UpdateUser))
            ;
    }

    public async Task<GetUserDto> GetUser(ISender sender, [AsParameters] GetUserQuery query)
    {
        return await sender.Send(query);
    }
    public async Task<bool> SetCompleteOnboarding(ISender sender, SetCompleteOnboardingCommand command)
    {
        return await sender.Send(command);
    }
    public async Task<bool> SetCompleteWalkthrough(ISender sender, SetCompleteWalkthroughCommand command)
    {
        return await sender.Send(command);
    }
    public async Task<string> SetDefaultTheme(ISender sender, SetDefaultThemeCommand command)
    {
        return await sender.Send(command);
    }
    public async Task<string> SetDefaultCurrency(ISender sender, SetDefaultCurrencyCommand command)
    {
        return await sender.Send(command);
    }
    public async Task<UpdateUserDto> UpdateUser(ISender sender, UpdateUserCommand command)
    {
        return await sender.Send(command);
    }
}
