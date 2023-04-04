﻿using FMS.Domain.Entities.Common.Interface;
using System;
using System.Collections.Generic;
using System.Text;
using FMS.Infrastructure;
using FMS.Domain.Entities.Auth;
using System.Threading.Tasks;
using FMS.Infrastructure.Webservice;

namespace FMS.Application.GPSGateservice
{
    public class GPSGateService
    {
        private readonly IGPSGateDirectoryWebservice _gPSGateDirectoryWebservice;

        
        private static string sessionID;

        public GPSGateService(IGPSGateDirectoryWebservice gPSGateDirectoryWebservice)
        {
            _gPSGateDirectoryWebservice = gPSGateDirectoryWebservice;
        }


        public async Task<string> Login (GPSGateConections conn)
        {
            var results= await _gPSGateDirectoryWebservice.LoginAsyn(conn);

            SessionID = results;
            return results; 
        }


     

        public string SessionID { get; set; }


    }
}
