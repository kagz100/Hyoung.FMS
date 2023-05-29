using FMS.Application.Models;
using FMS.Application.Models.Employee;
using FMS.Domain.Entities;
using FMS.Domain.Entities.Common;
using FMS.Infrastructure.DependancyInjection;
using FMS.Infrastructure.Webservice;
using FMS.Persistence.DataAccess;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;


namespace FMS.Application.Queries.GPSGATEServer.GetconsumptionReport
{
    public class GetConsumptionReportQueryHandler : IRequestHandler<GetConsumptionReportQuery, List<VehicleConsumptionInfoDTO>>
    {

        private readonly IGPSGateDirectoryWebservice _gpsGateDirectoryWebservice;
        private readonly GpsdataContext _Context;

        public GetConsumptionReportQueryHandler(IGPSGateDirectoryWebservice gPSGateDirectoryWebservice, GpsdataContext gpsdataContext)
        {
            _gpsGateDirectoryWebservice = gPSGateDirectoryWebservice;
            _Context = gpsdataContext;
        }
        public async Task<List<VehicleConsumptionInfoDTO>> Handle(GetConsumptionReportQuery request, CancellationToken cancellationToken)
        {

            //call the webservice to get the consumption report

            var consumptionReport = await _gpsGateDirectoryWebservice.GetFuelConsumptionReportAsync(request.conn, request.FuelConsumptionReportId.Value, request.From, request.To);

            //fetch all vehicle from database
            var vehicles = _Context.Vehicles
                           .Include(v => v.VehicleType)
                            .Include(v => v.VehicleModel)
                            .Include(v => v.Employees)
                            .Include(v=>v.WorkingSite)
                            .ToList();

            var result = consumptionReport.Select(Consumption =>
            {
                var vehicle = vehicles.FirstOrDefault(x => x.VehicleId == Consumption.VehicleId);


                if (vehicle != null)
                {
                    return new VehicleConsumptionInfoDTO
                    {
                        VehicleId = vehicle.VehicleId,
                        TotalFuel = Consumption.TotalFuel,
                        HyoungNo = vehicle.HyoungNo,
                        VehicleType = vehicle.VehicleType?.Name,
                        VehicleModel = vehicle.VehicleModel?.Name,
                        ExpectedAveraged = vehicle.ExpectedAveraged,
                        Site = vehicle.WorkingSite?.Name,
                        ExcessWorkingHrCost = vehicle.ExcessWorkingHrCost,
                        DefaultEmployees = vehicle.Employees.Select(e=>new EmployeeDto 
                        {
                         Id = e.Id,
                         FullName= e.FullName
                             }).ToList(),
                        Date = Consumption.Date,
                        MaxSpeed = Consumption.MaxSpeed,
                        AvgSpeed = Consumption.AvgSpeed,
                        TotalDistance = Consumption.TotalDistance.Value,
                        EngHours = Consumption.EngHours,
                        //IsNightShift = vehicle.,
                       // FuelEfficiency = Consumption.FuelEfficiency,
                        IsAverageKm = vehicle.AverageKmL
                    };
                }
                else
                {
                    //if the vehicle is not found , you can return null or default instance of the vehicleConsumptionInfo

                    //TODO : if its empty it means you need to add the ID of vehicle To Mysql Database ..
                    // create a notification to tell the user to create a new user that matches the vehicleID  

                    return null;
                }
            }).Where(confinfo => confinfo != null).ToList();



            return result;

        }
    }

}

