using System;
using System.Collections.Generic;
using System.Text;

namespace Hyoung.FMS.Model.EntityModel
{
   public class Vehicle
    {

        public int VehicleID { get; set; }


        public  string VehicleName { get; set; }


        public string HyoungNo { get; set; }


        public  string Make  { get; set; }

        public string Model { get; set; }


        public bool HasTwoTanks { get; set; }

        public decimal FuelTank1  { get; set; }

        public decimal FuelTank2 { get; set; }


        public VehicleType VehicleType { get; set; }

        public FuelEffiency FuelEffiencyMeasure { get; set; }

        public Site Site { get; set; }

        public Driver Driver { get; set; }


        public int PhoneNumber { get; set; }

        public string Device { get; set; }

        public int IMEI { get; set; }


    }
}
