using FMS.Application.Models;
using FMS.Domain.Entities;
using FMS.Domain.Entities.Auth;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace FMS.Application.Queries.GPSGATEServer.GetconsumptionReport
{
    public class GetConsumptionReportQuery : IRequest<List<VehicleConsumptionInfoDTO>>
    {



        public GetConsumptionReportQuery(GPSGateConections conn, int fuelConsumptionReportId, DateTime from, DateTime to)
        {
            this.conn = conn;
            FuelConsumptionReportId = fuelConsumptionReportId;
            From = from;
            To = to;
        }




        public GPSGateConections conn { get; set; }

        public int FuelConsumptionReportId { get; set; }


        public DateTime From { get; set; }

        public DateTime To { get; set; }
    }
}
