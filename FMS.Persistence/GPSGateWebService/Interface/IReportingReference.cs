using FMS.Domain.TelemetryModel;
using FMS.WebClient.Models.Settings;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FMS.Persistence.GPSGateWebService.Interface
{

    public interface IReportingReference: IErrorChecker
    {

        Task<IQueryable<Report>> GetReportList(GPSGateConections connection);

    }
}
