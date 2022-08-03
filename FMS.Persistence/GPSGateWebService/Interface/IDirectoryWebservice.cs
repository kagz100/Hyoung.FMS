using DirectoryReference;
using FMS.Domain.Entities.Auth;
using FMS.Domain.TelemetryModel;
using FMS.WebClient.Models.Settings;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace FMS.Persistence.GPSGateWebService.Interface
{
    public  interface IDirectoryWebservice :IDataContext
    {

        Task<string> LoginAsyn(GPSGateConections GPSconnection);


    }



    public interface IDataContext
    
    {
        GPSGateConections GPSGateConnection { get; set; }

    }



}
