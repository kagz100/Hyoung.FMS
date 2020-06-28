using FMS.Domain.Entities.Common;
using System;
using System.Collections.Generic;
using System.Text;

namespace FMS.Domain.TelemetryModel
{
    /// <summary>
    /// Contains Report 
    /// </summary>
  public class Report:Entity
    {

        public string Name { get; set; }

        public string Description { get; set; }


        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        
    }
}
