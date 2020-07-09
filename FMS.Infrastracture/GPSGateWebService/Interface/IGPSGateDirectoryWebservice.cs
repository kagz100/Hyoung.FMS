using FMS.Domain.Entities.Auth;
using FMS.WebClient.Models.Settings;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace FMS.Infrastracture.GPSGateWebService.Interface
{
    public  interface IGPSGateDirectoryWebservice:IErrorChecker
    {

        GPSGateConections GPSGateConnection { get; set; }
        Task<string> LoginAsyn(GPSGateUser user, GPSGateConections connection);
    }
}
