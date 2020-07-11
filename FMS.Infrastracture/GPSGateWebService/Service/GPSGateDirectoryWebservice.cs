using FMS.Domain.Entities.Auth;
using FMS.Infrastracture.GPSGateWebService.Interface;
using FMS.WebClient.Models.Settings;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;
using System.Configuration;
using Microsoft.Extensions.Configuration;

namespace FMS.Infrastracture.GPSGateWebService.Service
{
    public class GPSGateDirectoryWebservice : IGPSGateDirectoryWebservice
    {

        public GPSGateConections GPSGateConnection { get ; set; }

       public GPSGateDirectoryWebservice ()
        {

        }



        public void CheckError(XElement element)
        {
            throw new NotImplementedException();
        }

        public async Task<string> LoginAsyn(GPSGateUser user, GPSGateConections connection)
        {
            throw new NotImplementedException();
        }
    }
}
