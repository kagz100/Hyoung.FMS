using FMS.Domain.Entities;
using FMS.Domain.Entities.Auth;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace FMS.Infrastructure.DependancyInjection
{
  public interface IGPSGateDirectoryWebservice
    {

        Task<string> LoginAsyn(GPSGateConections user);
        Task<List<Vehicleconsumption>> GetFuelConsumptionReportAsync(GPSGateConections conn, int FuelConsumptionReportID, DateTime from, DateTime to);

    }
}
