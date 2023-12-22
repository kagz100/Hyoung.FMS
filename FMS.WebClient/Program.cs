using System;
using FMS.WebClient.Controllers;
using System.Reflection;

using FMS.Application.Models;
using FMS.Infrastructure.DependancyInjection;
using FMS.Infrastructure.Webservice;
using MediatR;
using AutoMapper;

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

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllersWithViews().AddJsonOptions(
    options =>
    {
    // options.JsonSerializerOptions.ReferenceHandler  = ReferenceHandler.Preserve;
        options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
        options.JsonSerializerOptions.MaxDepth = 0;
    });



//builder.Services.AddMediatR(typeof(ConsumptionController).GetTypeInfo().Assembly);
builder.Services.AddMediatR(cfg=>
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
        .WithOrigins("https://localhost:44403") //change
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
   // app.UseCors("AllowSpecificOrigin");
    }
app.UseCors("AllowSpecificOrigin");

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

//app.MapFallbackToFile("index.html");

app.Run();
