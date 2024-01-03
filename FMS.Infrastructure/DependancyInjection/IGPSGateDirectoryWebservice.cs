using FMS.Domain.Entities;
using FMS.Domain.Entities.Auth;
using FMS.Services.GPSServiceModels;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace FMS.Infrastructure.DependancyInjection
{
  public interface IGPSGateDirectoryWebservice
    {

        Task<string> LoginAsyn(GPSGateConections user);
        Task<List<VehicleConsumptionServiceModel>> GetFuelConsumptionReportAsync(GPSGateConections conn, int FuelConsumptionReportID, DateTime from, DateTime to);

    }
}
