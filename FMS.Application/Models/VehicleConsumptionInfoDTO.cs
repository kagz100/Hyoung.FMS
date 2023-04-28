using FMS.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FMS.Application.Models
{
    public class VehicleConsumptionInfoDTO
    {
              
            public int VehicleId { get; set; }


        
            public decimal? TotalFuel
              { get;set;
              }
            public string HyoungNo { get; set; }
            public String VehicleType { get; set; }
            public string VehicleModel { get; set; }
            public string VehicleManufacturer { get; set; }
            public decimal ExpectedAveraged { get; set; }
            public string DefaultEmployee { get; set; }
            public string Site { get; set; }
            public decimal? ExcessWorkingHrCost { get; set; }

           public string EmployeeWorkNumber { get; set; }

           public DateTime Date { get; set; }

           public decimal? MaxSpeed { get; set; }

           public decimal? AvgSpeed { get; set; }

        /// <summary>
        /// Check if the vehicle is using averagekm = true if not return 0
        /// </summary>
        private decimal? _totalDistance;
        public decimal? TotalDistance {

            get
            {
                if (IsAverageKm)
                {
                    return _totalDistance.HasValue?(decimal)((int)(_totalDistance.Value/1000)):(decimal?)null;
                }
                else
                {
                    return 0;
                }
            }


            set
            {

                _totalDistance = value;
            }
        }



        private decimal? _fuellost;
        /// <summary>
        /// Find calculated fuel lost of vehicle , It is depend on Fuel efficienc if vehicle is using Averagekm
        /// </summary>
        public decimal? FuelLost 
        {
            get => CalculateFuelLost();
           
        }

        private decimal? CalculateFuelLost()
        {
            decimal fuellost = 0;

            //find if the vehicle is using km/l
                if(IsAverageKm)
                  {
                //calulate fuel lost in km/l
                if(FuelEfficiency.HasValue && FuelEfficiency.Value < ExpectedAveraged)
                {
                    fuellost = TotalFuel.HasValue ? TotalFuel.Value - (TotalDistance ?? 0) / ExpectedAveraged : 0;
                }
                }else //caluate fuel in l/hrs
            {
                if(FuelEfficiency.HasValue && FuelEfficiency.Value > ExpectedAveraged)
                {
                    fuellost = TotalFuel.HasValue ? TotalFuel.Value - (ExpectedAveraged * (EngHours??0)) : 0;
                }
            }

            int roundedFuelLost = (int)Math.Round(Math.Abs(fuellost));

            return roundedFuelLost;


        }


        //if the vehicle is using averagekm or l/hrs
        public bool IsAverageKm { get; set; }
        public decimal? FlowMeterFuelUsed { get; set; }

        public decimal? FlowMeterFuelLost { get; set; }

        public decimal? FlowMeterEffiency { get; set; }

        public decimal? FuelEfficiency { get; set; }

        public decimal? EngHours { get; set; }

        public decimal? FlowMeterEngineHrs { get; set; }

        public bool IsNightShift { get; set; }

        public string comments { get; set; }
    }
}
