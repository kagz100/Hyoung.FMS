﻿using FMS.Domain.Entities.Auth;
using FMS.Infrastructure.DependancyInjection;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace FMS.Application.Queries.GPSGATEServer.LoginQuery
{
    /// <summary>
    /// To login in to the GPSGate server
    /// </summary>
    public  class LoginQuery : IRequest<GPSGateConections>
    {

   public GPSGateConections GPSGateConections { get; set; }

    }

    /// <summary>
    /// Login Query Handler 
    /// </summary>
    public class LoqinQuery: IRequestHandler<LoginQuery, GPSGateConections>
    {

        private readonly IGPSGateDirectoryWebservice _gpsGateDirectoryWebservice;

        public LoqinQuery(IGPSGateDirectoryWebservice gPSGateDirectoryWebservice)
        {
            _gpsGateDirectoryWebservice = gPSGateDirectoryWebservice;
        }

        /// <summary>
        /// To login in to the GPSGate server
        /// </summary>
        /// <param name="request"></param>
        /// <param name="cancellationToken"></param>
        /// <returns>GPSConnections information conns</returns>
             public async Task<GPSGateConections> Handle(LoginQuery request, CancellationToken cancellationToken)
        {
            var conn = request.GPSGateConections;
            var sessionId = await _gpsGateDirectoryWebservice.LoginAsyn(conn);

            conn.SessionID = sessionId;
            return conn;
        }
    }

}
