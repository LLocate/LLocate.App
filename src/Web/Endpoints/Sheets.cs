using LLocate.Application.Common.Models;
using LLocate.Application.Goals.Commands;
using LLocate.Application.Goals.DTOs;
using LLocate.Application.Goals.Queries;
using LLocate.Application.Sheets.Commands;
using LLocate.Application.Sheets.DTOs;
using LLocate.Application.Sheets.Queries;
using LLocate.Application.TodoItems.Commands.CreateTodoItem;
using LLocate.Application.TodoItems.Commands.DeleteTodoItem;
using LLocate.Application.TodoItems.Commands.UpdateTodoItem;
using LLocate.Application.TodoItems.Commands.UpdateTodoItemDetail;
using LLocate.Application.TodoItems.Queries.GetTodoItemsWithPagination;
using LLocate.Domain.Entities.Goals;
using LLocate.Domain.Entities.Sheets;

namespace LLocate.Pro.Endpoints;

public class Sheets : EndpointGroupBase
{
    public override void Map(WebApplication app)
    {
        app.MapGroup(this)
            .RequireAuthorization()
            .MapGet(GetAllSheetItemSettings, nameof(GetAllSheetItemSettings))
            .MapGet(GetSheet, nameof(GetSheet))
            .MapGet(GetValidSheetItemSettings, nameof(GetValidSheetItemSettings))
            .MapGet(GetSheetSetting, nameof(GetSheetSetting))
            .MapPost(GenerateSheet, nameof(GenerateSheet))
            .MapPost(UpdateSheet, nameof(UpdateSheet))
            .MapPost(UpsertSheetItem, nameof(UpsertSheetItem))
            .MapPost(UpsertSheetItemSetting, nameof(UpsertSheetItemSetting))
            .MapPost(UpdateSheetSetting, nameof(UpdateSheetSetting))
            .MapPost(UpsertSheetItemEntry, nameof(UpsertSheetItemEntry))
            .MapDelete(DeleteSheet, nameof(DeleteSheet));
    }

    public async Task<List<SheetItemSetting>> GetAllSheetItemSettings(ISender sender, [AsParameters] GetAllSheetItemSettingsQuery query)
    {
        return await sender.Send(query);
    }
    public async Task<GetSheetDto> GetSheet(ISender sender, [AsParameters] GetSheetQuery query)
    {
        return await sender.Send(query);
    }
    public async Task<List<SheetItemSetting>> GetValidSheetItemSettings(ISender sender, [AsParameters] GetValidSheetItemSettingsQuery query)
    {
        return await sender.Send(query);
    }
    public async Task<SheetSetting> GetSheetSetting(ISender sender, [AsParameters] GetSheetSettingQuery query)
    {
        return await sender.Send(query);
    }


    public async Task<bool> GenerateSheet(ISender sender, GenerateSheetCommand command){
        return await sender.Send(command);    
    }
    public async Task<Sheet> UpdateSheet(ISender sender, UpdateSheetCommand command){
        return await sender.Send(command);        
    }
    public async Task<SheetItem> UpsertSheetItem(ISender sender, UpsertSheetItemCommand command){
        return await sender.Send(command);            
    }
    public async Task<SheetItemSetting> UpsertSheetItemSetting(ISender sender, UpsertSheetItemSettingCommand command){
        return await sender.Send(command);                
    }
    public async Task<SheetSetting> UpdateSheetSetting(ISender sender, UpdateSheetSettingCommand command)
    {
        return await sender.Send(command);
    }
    public async Task<SheetItemEntry> UpsertSheetItemEntry(ISender sender, UpsertSheetItemEntryCommand command)
    {
        return await sender.Send(command);
    }
    public async Task<bool> DeleteSheet(ISender sender, [AsParameters] DeleteSheetCommand command)
    {
        return await sender.Send(command);
    }

}
