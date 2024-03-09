using AutoMapper;
using AutoMapper.Configuration.Annotations;
using FMS.Application.Models;
using FMS.Application.Models.Employee;
using FMS.Domain.Entities;
using FMS.Domain.Entities.Common;
using FMS.Infrastructure.DependancyInjection;
using FMS.Infrastructure.Webservice;
using FMS.Persistence.DataAccess;
using FMS.Services.GPSServiceModels;
//using FMS.Services.Model;
using MediatR;
using Microsoft.AspNetCore.Server.IIS.Core;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;


namespace FMS.Application.Queries.GPSGATEServer.GetconsumptionReport;

    public class GetConsumptionReportQueryHandler : IRequestHandler<GetConsumptionReportQuery, List<VehicleConsumptionInfoDTO>>
    {

        private readonly IGPSGateDirectoryWebservice _gpsGateDirectoryWebservice;
        private readonly GpsdataContext _Context;
        private readonly IMapper _mapper;

        private readonly ILogger _logger;

        public GetConsumptionReportQueryHandler(IGPSGateDirectoryWebservice gPSGateDirectoryWebservice, GpsdataContext gpsdataContext,IMapper mapper, ILogger<GetConsumptionReportQueryHandler> logger)
        {
            _gpsGateDirectoryWebservice = gPSGateDirectoryWebservice;
            _Context = gpsdataContext;
            _mapper = mapper;
            _logger = logger;
        }

    /// <summary>
    /// Fa
    /// </summary>
    /// <param name="request"></param>
    /// <param name="cancellationToken"></param>
    /// <returns></returns>
    public async Task<List<VehicleConsumptionInfoDTO>> Handle(GetConsumptionReportQuery request, CancellationToken cancellationToken)
    {
        //get the consumption report from GPSGate server
        var (consumptionReport,vehicles) = await FetchDataAsync(request);

        //process the data to be saved in the database
        var VehicleconsumptionBatch  = ProcessData(consumptionReport, vehicles);

        //save the data to the database
        await SaveData(VehicleconsumptionBatch, request, cancellationToken);

        return await ReturnResults(request);


    }

    /// <summary>
    /// Get or fetch consumption report from GPSGate server
    /// </summary>
    /// <param name="request"></param>
    /// <returns> A list of Vehicle Consumption </returns>
    /// <exception cref="ArgumentNullException"></exception>
    private async Task<(IEnumerable<VehicleConsumptionServiceModel>, List<Vehicle>)> FetchDataAsync(GetConsumptionReportQuery request)
    {
       var consumptionReport = await _gpsGateDirectoryWebservice.GetFuelConsumptionReportAsync(request.conn, request.FuelConsumptionReportId.Value, request.From, request.To);
       

        if(consumptionReport == null) throw new ArgumentNullException(nameof(consumptionReport));
     
        var vehicleIds = consumptionReport.Select(x => x.VehicleId).ToList();
        var vehicles = await _Context.Vehicles.Where(x => vehicleIds.Contains(x.VehicleId)).ToListAsync();
        if (vehicles == null) throw new ArgumentNullException(nameof(vehicles));

        return (consumptionReport,vehicles);

    }
    /// <summary>
    /// Convert the consumption report from GPSGate server to Vehicle Consumption to be saved in the database
    /// </summary>
    /// <param name="VCconsumptionReports">Processed  data from vehicle consumption Service model . Any changes to be doone here  </param>
    /// <param name="vehicles"></param>
    /// <returns></returns>
    private List<Vehicleconsumption> ProcessData(IEnumerable<VehicleConsumptionServiceModel> VCconsumptionReports ,List<Vehicle> vehicles)
    {

       


        var vehicleConsumptionBatch = new List<Vehicleconsumption>();

        foreach (var VCserviceModel in VCconsumptionReports)
        {

             var vehicle = vehicles.FirstOrDefault(v => v.VehicleId == VCserviceModel.VehicleId);



            if(vehicle != null)
            {
                //int? siteID = getSiteIDbyVehicleID(vehicle.VehicleId);
                Vehicle vehicleinfo = getvehicleInfo(vehicle.VehicleId).Result; //check if vehicle is null or no result 

                decimal? FuelEfficiency = 0;

                if (vehicleinfo.AverageKmL && VCserviceModel.TotalFuel.HasValue && VCserviceModel.TotalDistance.HasValue && VCserviceModel.TotalDistance.Value > 0 && VCserviceModel.TotalFuel > 0)
                {
                    FuelEfficiency = VCserviceModel.TotalDistance / VCserviceModel.TotalFuel; //is km/l
                }
                else if (!vehicleinfo.AverageKmL && VCserviceModel.TotalFuel.HasValue && VCserviceModel.EngHours.HasValue && VCserviceModel.EngHours.Value > 0 && VCserviceModel.TotalFuel > 0)
                {
                    FuelEfficiency = VCserviceModel.TotalFuel /  VCserviceModel.EngHours;//is l/hr
                }
                else
                {
                    FuelEfficiency = 0;
                }


                decimal? fuelLost = 0;
                decimal? expectedAverage = vehicleinfo.DefaultExptdAvg.ExpectedAverageValue;

                if (vehicleinfo.AverageKmL)
                {
                    if (expectedAverage < FuelEfficiency && FuelEfficiency > 0 )
                     {
                        fuelLost = VCserviceModel.TotalFuel.HasValue && expectedAverage != 0 ? VCserviceModel.TotalFuel - (VCserviceModel.TotalDistance ?? 0) / expectedAverage : 0;
                    }

                }
                else //calculate l/hr
                {
                    if( expectedAverage>FuelEfficiency && FuelEfficiency > 0)
                    {
                        fuelLost = VCserviceModel.TotalFuel.HasValue && VCserviceModel.EngHours != 0 ? VCserviceModel.TotalFuel - (expectedAverage * (VCserviceModel.EngHours ?? 0)) : 0; 
                    }
                }




                var savedConsumption = new Vehicleconsumption
                {
                    VehicleId = vehicle.VehicleId, ///check if vehicle is null or no result
                    SiteId = vehicleinfo.WorkingSiteId??1 ,
                    Date = VCserviceModel.Date,
                    MaxSpeed = VCserviceModel.MaxSpeed,
                    AvgSpeed = VCserviceModel.AvgSpeed,
                    ExpectedConsumption = expectedAverage,
                    TotalDistance = VCserviceModel.TotalDistance,
                    EmployeeId = vehicleinfo.DefaultEmployeeId??28459,
                    Comments = "Unmodified",
                    FuelLost =fuelLost,
                    FuelEfficiency = FuelEfficiency,
                    TotalFuel = VCserviceModel.TotalFuel,
                    FlowMeterFuelUsed = VCserviceModel.FlowMeterFuelUsed,
                    FlowMeterFuelLost = 0,
                    FlowMeterEffiency = 0,
                    EngHours = VCserviceModel.EngHours,
                    FlowMeterEngineHrs = VCserviceModel.FlowMeterEngineHrs,
                    ExcessWorkingHrsCost = 0,
                    IsNightShift = 0,
                    IsKmperhr = vehicle.AverageKmL ? 1UL : 0UL,
                    ModifiedBy = 1, //getCurrentUserID
                    ModifiedDate = DateTime.Now,
                    IsModified = 0
                };

                //check if there is duplicate from the data fetched from GPSGate server : highly unlikely but just in case
                var duplicateInBatch = vehicleConsumptionBatch.FirstOrDefault(vc =>
                       vc.VehicleId == savedConsumption.VehicleId && vc.Date.Date == savedConsumption.Date.Date);

                if (duplicateInBatch == null)
                {
                    vehicleConsumptionBatch.Add(savedConsumption);
                }
            }


        }

        return vehicleConsumptionBatch;

    }



    private async Task<Vehicle> getvehicleInfo(int vehicleId)
    {
        try
        {
            var vehicle = await _Context.Vehicles.Include(e => e.Expectedaverages).FirstOrDefaultAsync(x => x.VehicleId == vehicleId);

            return vehicle;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex.Message);
            throw new Exception(ex.Message);
        }
    }

    /// <summary>
    ///  Save the data to the database and check for duplicates
    /// </summary>
    /// <param name="vehicleConsumptionBatch">Vehicle batch from GPSGate </param>
    /// <param name="results">User Parameter</param>
    /// <param name="cancellationToken"></param>
    /// <returns></returns>
    private async Task SaveData(List<Vehicleconsumption> vehicleConsumptionBatch , GetConsumptionReportQuery results , CancellationToken cancellationToken)
    {
         //use Try 

         try{
        var relevantData = await _Context.Vehicleconsumptions.Where(v => v.Date.Date >= results.From.Date && v.Date.Date <= results.To.Date).ToListAsync(cancellationToken);

        //check for duplicates
        foreach(var consumption in vehicleConsumptionBatch)
        {
            var isAlreadySaved = relevantData.Any(v => v.VehicleId == consumption.VehicleId && v.Date.Date == consumption.Date.Date && v.IsNightShift == consumption.IsNightShift);

            if(!isAlreadySaved)
            {
                _Context.Vehicleconsumptions.Add(consumption);

                await _Context.SaveChangesAsync(cancellationToken);

            }
        }
         }
         catch(MySqlException ex)
         {

                _logger.LogError(ex.Message);
             throw new Exception(ex.Message);
         }
      }

    /// <summary>
    /// Return the Requested Consumption result to the user
    /// </summary>
    /// <param name="request"></param>
    /// <returns></returns>
    /// <exception cref="ArgumentNullException"></exception>
     private async Task<List<VehicleConsumptionInfoDTO>> ReturnResults (GetConsumptionReportQuery request)
    {

        var vehicleConsumptionData = await _Context.Vehicleconsumptions
                                      .Include(v => v.Vehicle)
                                      .Include(v=>v.Vehicle.VehicleManufacturer)
                                      .Include(v=>v.Vehicle.VehicleModel)
                                      .Include(v=>v.Vehicle.VehicleType)
                                      .Include(v=>v.Site)
                                      .Include(v=>v.Employee)
                                     .Where(v => v.Date.Date >= request.From.Date && v.Date.Date <= request.To.Date && v.IsModified == 0).ToListAsync();

        if(vehicleConsumptionData.Count == 0) throw new ArgumentNullException(nameof(vehicleConsumptionData));

        return vehicleConsumptionData.Select(v=> _mapper.Map<VehicleConsumptionInfoDTO>(v)).ToList();
    }


    }





    



