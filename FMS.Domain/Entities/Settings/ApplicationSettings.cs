using System;
using System.Collections.Generic;
using System.Text;

namespace FMS.Domain.Entities.Settings
{
   public  class ApplicationSettings
    {

        public int SettingsID { get; set; }

        public int ApplicationID { get; set; }

        public int ConsumptionReportID { get; set; }

        public int FuelReportID { get; set; }

        public int VehicleDisconnectionID { get; set; }

        public int VehicleWithNoFuelID { get; set; }

    }
}
