using System;
using FMS.WebClient.Controllers;
using System.Reflection;

using FMS.Application.Models;
using FMS.Application.Queries.GetconsumptionReport;
using FMS.Infrastructure.DependancyInjection;
using FMS.Infrastructure.Webservice;
using MediatR;

using FMS.Persistence.DataAccess;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllersWithViews();


//builder.Services.AddMediatR(typeof(ConsumptionController).GetTypeInfo().Assembly);
builder.Services.AddMediatR(cfg=>
{
    cfg.RegisterServicesFromAssemblyContaining<Program>();
    cfg.RegisterServicesFromAssembly(typeof(ConsumptionController).Assembly);
    cfg.RegisterServicesFromAssembly(typeof(GetConsumptionReportQueryHandler).Assembly);

});

//builder.Services.AddScoped<IRequestHandler<GetConsumptionReportQuery,List<VehicleConsumptionInfo>>,GetConsumptionReportQueryHandler>();
builder.Services.AddScoped<IGPSGateDirectoryWebservice, GPSGateDirectoryWebservice>();
builder.Services.AddDbContext<GpsdataContext>(options =>
          options.UseMySQL("server=10.0.10.150;port=3306;database=gpsdata;user=root;password=Niwewenamimi1000;connection timeout=200"));


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
    app.UseCors("AllowSpecificOrigin");


}
app.UseCors("AllowSpecificOrigin");

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

app.Run();
