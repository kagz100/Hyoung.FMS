using System;
using System.Collections.Generic;
using System.Text;

namespace Hyoung.FMS.Model.EntityModel.Reports
{
   public  class FuelConsumptionReportLightVehicles : Report
    {

        public Vehicle Vehicle { get; set; }

        public DateTime Date { get; set; }

        public Driver Driver { get; set; }


        public int Distance { get; set; }

        public int MaxSpeed { get; set; }

        public  int AvgSpeed { get; set; }

        public int ExpctedFuelAvg { get; set; }


        public int TotalFuel { get; set; }

        public Site Site { get; set; }

    }
}
