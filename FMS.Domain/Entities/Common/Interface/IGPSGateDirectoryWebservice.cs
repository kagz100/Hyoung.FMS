using FMS.Domain.Entities.Auth;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace FMS.Domain.Entities.Common.Interface
{
  public interface IGPSGateDirectoryWebservice
    {

        Task<string> LoginAsyn(GPSGateConections user);
        Task<string> GetFuelconsumptionReport(GPSGateConections conn, int FuelConsumptionReportID, DateTime from, DateTime to);

    }
}
