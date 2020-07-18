using FMS.Persistence.DataAccess;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore.SqlServer;
using Microsoft.EntityFrameworkCore;
using FMS.Application.Common.Interfaces;
using FMS.Persistence;
using FMS.Persistence.GPSGateWebService.Interface;
using FMS.Persistence.GPSGateWebService.Service;

namespace FMS.Persistence
{
   public static class DependacyInjection
    {
        public static IServiceCollection AddPersistence (this IServiceCollection services,IConfiguration configuration)
        {
            services.AddDbContext<FMSGPSContext>(options =>
           options.UseSqlServer(configuration.GetConnectionString("DefaultConnectionString")));


            services.AddScoped<IFMSContext>(provider => provider.GetService<FMSGPSContext>());

           // services.AddTransient<IDirectoryWebservice, GPSGateDirectoryWebservice>();
            services.AddScoped<IDirectoryWebservice>(provider => provider.GetService <GPSGateDirectoryWebservice>());
           // services.AddScoped<IGPSGateWebserviceContext>(provider => provider.GetService<GPSgateContext>());


            return services;


        }


    }
}
