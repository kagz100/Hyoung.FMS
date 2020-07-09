using Microsoft.Extensions.DependencyInjection;
using System.Text;
using AutoMapper;
using MediatR;
using System.Reflection;
using FMS.Application.Common.Behaviours;
using FMS.Application.Common.Interfaces;

namespace FMS.Application
{
  public static  class DependencyInjection
    {
        public static IServiceCollection AddApp (this IServiceCollection services)
        {
            services.AddAutoMapper(Assembly.GetExecutingAssembly());
            services.AddMediatR(Assembly.GetExecutingAssembly());



            services.AddTransient(typeof(IPipelineBehavior<,>), typeof(RequestPerformanceBehaviour<,>));
            services.AddTransient(typeof(IPipelineBehavior<,>), typeof(RequestValidationBehavior<,>));


            return services;

        }


    }
}
