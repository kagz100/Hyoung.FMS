using System;
using FMS.WebClient.Controllers;
using System.Reflection;
using FMS.WebClient.Signal;
using FMS.Application.Models;
using FMS.Infrastructure.DependancyInjection;
using MediatR;
using AutoMapper;
using System.Diagnostics;
using FMS.Persistence.DataAccess;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using FMS.Application.Queries.GPSGATEServer.GetconsumptionReport;
using FMS.WebClient.MappingProfile;
using FMS.Application.Queries.Database.VehicleQuery;
using FMS.Application.Queries.Database.SiteQuery;
using FMS.Application.Queries.Database.VehicleModelQuery;
using FMS.Application.Queries.Database.VehicleManufacturer;
using FMS.Application.Queries.Database.EmployeeQuery;
using FMS.Application.Queries.Database.VehicleTypeQuery;
using FMS.Application.MappingProfile;
using Autofac.Core;
using System.Security.Cryptography.Xml;
using System.Text.Json.Serialization;
using FMS.Infrastructure.Webservice.GPSService;
using NLog.Web;
using NLog;
using Microsoft.Extensions.Logging;


// Add services to the container.
var logger = NLog.LogManager.Setup().LoadConfigurationFromAppSettings().GetCurrentClassLogger();


try
{
    logger.Info("Application Starting Up");
    var builder = WebApplication.CreateBuilder(args);



    // Configure NLog for ASP.NET Core
    builder.Logging.ClearProviders();
    builder.Logging.SetMinimumLevel(Microsoft.Extensions.Logging.LogLevel.Trace);
    builder.Host.UseNLog();


    builder.Services.AddControllersWithViews().AddJsonOptions(
        options =>
        {
            // options.JsonSerializerOptions.ReferenceHandler  = ReferenceHandler.Preserve;
            options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
            options.JsonSerializerOptions.MaxDepth = 0;
        });

    builder.Services.AddSignalR();

    //builder.Services.AddMediatR(typeof(ConsumptionController).GetTypeInfo().Assembly);
    builder.Services.AddMediatR(cfg =>
    {
        cfg.RegisterServicesFromAssemblyContaining<Program>();
        cfg.RegisterServicesFromAssembly(typeof(ConsumptionController).Assembly);
        cfg.RegisterServicesFromAssemblies(typeof(VehicleController).Assembly);
        cfg.RegisterServicesFromAssembly(typeof(GetConsumptionReportQueryHandler).Assembly);
        cfg.RegisterServicesFromAssembly(typeof(GetVehicleQueryHandler).Assembly);
        cfg.RegisterServicesFromAssembly(typeof(GetSiteQueryHandler).Assembly);
        cfg.RegisterServicesFromAssembly(typeof(GetVehicleModelQueryHandler).Assembly);
        cfg.RegisterServicesFromAssembly(typeof(GetVehicleManufacturerHandler).Assembly);
        cfg.RegisterServicesFromAssembly(typeof(GetEmployeeHandler).Assembly);
        cfg.RegisterServicesFromAssembly(typeof(GetVehicleTypeQueryHandler).Assembly);


    });
    builder.Services.AddSingleton<PtsStatusService>();

    //builder.Services.AddScoped<IRequestHandler<GetConsumptionReportQuery,List<VehicleConsumptionInfo>>,GetConsumptionReportQueryHandler>();
    builder.Services.AddScoped<IGPSGateDirectoryWebservice, GPSGateDirectoryWebservice>();
    builder.Services.AddDbContext<GpsdataContext>(options =>
              options.UseMySQL("server=10.0.10.150;port=3306;database=gpsdata;user=root;password=Niwewenamimi1000;connection timeout=2000;command timeout=2000"));

    //Auto mapper profiles
    builder.Services.AddAutoMapper(typeof(VehicleMappingProfile));
    builder.Services.AddAutoMapper(typeof(MappingProfile).Assembly);

    builder.Services.AddCors(options =>
    {
        options.AddPolicy("AllowSpecificOrigin", build =>
        {
            build
            //.WithOrigins("https://localhost:3000") //change
                       .WithOrigins("http://10.0.11.90:7009", "http://localhost:7009", "http://localhost:3000", "http://10.0.11.90:3000")
            .AllowAnyHeader()
            .AllowAnyMethod();

        });
    });
    var app = builder.Build();

    // Configure the HTTP request pipeline.
    if (!app.Environment.IsDevelopment())
    {
        // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
        app.UseHsts();
        app.UseExceptionHandler("/Home/Error");
        // app.UseCors("AllowSpecificOrigin");
    }
    app.UseCors("AllowSpecificOrigin");
    app.Use(async (context, next) =>
    {
        //log request information here 


        logger.Info("Handling request: {RequestMethod} {RequestPath}", context.Request.Method, context.Request.Path);
        try
        {
            await next.Invoke();
            //log response information here

            logger.Info("Finished handling request. Response status code: {ResponseStatusCode}", context.Response.StatusCode);
        }
        catch (Exception ex)
        {
            logger.Error(ex, "An unhandled exception has occurred while executing the request. Response status code: {ResponseStatusCode}", context.Response.StatusCode);
            throw;
        }


    });
    app.UseHttpsRedirection();
    app.UseStaticFiles();
    app.UseRouting();

  app.UseEndpoints(endpoints =>
    {
        endpoints.MapControllers();
        endpoints.MapHub<PtsStatusHub>("/ptsstatushub");

    });


    app.MapControllerRoute(
        name: "default",
        pattern: "{controller}/{action=Index}/{id?}");

    //app.MapFallbackToFile("index.html");
    try
    {
        app.Run();
    }
    catch (Exception ex) {
        Debugger.Launch();
    logger.Error("App Err",ex.Message);
    }

}
catch (Exception ex)
{
    logger.Error(ex, "Stopped program because of exception");

}
finally
{
    NLog.LogManager.Shutdown();

}