using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
//using FMS.Services.ATGServiceModels;
using FMS.Services.Models.ATGModels.Probe;

namespace FMS.Infrastructure.DependancyInjection.ATG
{
    public interface IATGCommunitcationService
    {     

        Task<ProbeMeasurementsResponse> GetTankLevelAsync(int probeId);
    }
}
