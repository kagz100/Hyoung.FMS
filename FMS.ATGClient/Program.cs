using System;
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
using FMS.Application.MappingProfile;
using Autofac.Core;
using System.Security.Cryptography.Xml;
using System.Text.Json.Serialization;
using FMS.Infrastructure.Webservice.GPSService;
using NLog.Web;
using NLog;
using Microsoft.Extensions.Logging;




var app = builder.Build();




app.Run();


