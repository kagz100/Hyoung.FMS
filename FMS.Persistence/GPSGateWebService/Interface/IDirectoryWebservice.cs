using DirectoryReference;
using FMS.Domain.Entities.Auth;
using FMS.WebClient.Models.Settings;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace FMS.Persistence.GPSGateWebService.Interface
{
    public  interface IDirectoryWebservice:IErrorChecker, DirectorySoap
    {

        GPSGateConections GPSGateConnection { get; set; }
        Task<string> LoginAsyn(GPSGateConections GPSconnection);
    }
}
