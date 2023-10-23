using Azure.Identity;
using LLocate.Application.Common.Interfaces;
using LLocate.Infrastructure.Data;
using LLocate.Pro.Services;
using ZymLabs.NSwag.FluentValidation;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Mvc;

namespace Microsoft.Extensions.DependencyInjection;

public static class ConfigureServices
{
    public static IServiceCollection AddWebServices(this IServiceCollection services)
    {
        // Configure JsonSerializerOptions - THIS GOOD SHIT IS THE NEW WAY FOR MINIMAL API
        services.Configure((AspNetCore.Http.Json.JsonOptions options) =>
        {
            // Set JsonSerializerOptions properties here
            options.SerializerOptions.MaxDepth = 32;
            options.SerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
            // Add any other configuration options you need
        });

        services.AddDatabaseDeveloperPageExceptionFilter();

        services.AddScoped<IUser, CurrentUser>();

        services.AddHttpContextAccessor();

        services.AddHealthChecks()
            .AddDbContextCheck<ApplicationDbContext>();

        services.AddExceptionHandler<CustomExceptionHandler>();

        services.AddRazorPages();

        services.AddScoped(provider =>
        {
            var validationRules = provider.GetService<IEnumerable<FluentValidationRule>>();
            var loggerFactory = provider.GetService<ILoggerFactory>();

            return new FluentValidationSchemaProcessor(provider, validationRules, loggerFactory);
        });

        // Customise default API behaviour
        services.Configure<ApiBehaviorOptions>(options =>
            options.SuppressModelStateInvalidFilter = true);

        services.AddEndpointsApiExplorer();

        services.AddOpenApiDocument(configure =>
        {
            configure.Title = "LLocate API";
            configure.Version = "v1";
        });

        return services;
    }

    public static IServiceCollection AddKeyVaultIfConfigured(this IServiceCollection services, ConfigurationManager configuration)
    {
        var keyVaultUri = configuration["KeyVaultUri"];
        if (!string.IsNullOrWhiteSpace(keyVaultUri))
        {
            configuration.AddAzureKeyVault(
                new Uri(keyVaultUri),
                new DefaultAzureCredential());
        }

        return services;
    }
}
