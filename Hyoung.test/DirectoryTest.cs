using Moq;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Text;
using FMS.Persistence.GPSGateWebService.Interface;
using FMS.WebClient.Models.Settings;
using FMS.Persistence.GPSGateWebService.Service;
using FMS.Domain.Entities.Settings;
using FMS.Domain.Entities.Auth;
using System.Threading.Tasks;
using Unity;
using MediatR;
using AutoMapper;

namespace Hyoung.test
{
    [TestFixture]
   public class DirectoryTest
    {

        private IMediator _mediatorFake;

        private IMapper automapper;






    }


    public static class UnityHelper
    {
        public static UnityContainer IoC;
    }
}
