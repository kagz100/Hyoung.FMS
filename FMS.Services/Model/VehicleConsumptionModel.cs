using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FMS.Services.Model
{

    public  class VehicleConsumptionModel
    {
        private decimal? _totalDistance;
        private bool iskmperltr;
        private decimal? enginehrs;
        public decimal? TotalDistance
        {
           get
            {
               if (IsAverageKm)
                {
                    return _totalDistance.HasValue ? (decimal)((int)(_totalDistance.Value / 1000)) : (decimal?)null;
                }
                else
                {
                    return 0;
                }
            }
            set
            {  _totalDistance = value;  }
        }

        public int VehicleId { get; set; }
      
        public decimal? EngHours
        {

            get
            {
                if (enginehrs.HasValue)
                {
                    return enginehrs.Value / 3600;
                }
                else
                { return null; }
            }
            set
            {
                enginehrs = value;
            }
        }
        public decimal? TotalFuel { get; set; }
        public decimal? FlowMeterEngineHrs { get; set; }
        public decimal? FlowMeterFuelUsed { get; set; }
        public SiteService? Site { get; set; }
        public decimal AvgSpeed { get; set; }
        public decimal MaxSpeed { get; set; }
        public DateTime Date { get; set; }
        public decimal? FlowMeterEffiency
        {
            get
            {
                if (IsAverageKm && FlowMeterFuelUsed.HasValue && TotalDistance.HasValue && TotalDistance.Value > 0)
                {
                    return TotalDistance / FlowMeterFuelUsed;
                }
                else if (!IsAverageKm && FlowMeterFuelUsed.HasValue && EngHours.HasValue && EngHours.Value > 0)
                {
                    return FlowMeterFuelUsed / EngHours;
                }
                else
                {
                    return null;
                }
            }


        }

        public decimal? FuelEfficiency
        {
            get
            {
                if (iskmperltr && TotalFuel.HasValue && TotalDistance.HasValue && TotalDistance.Value > 0)
                {
                    return TotalDistance / TotalFuel;
                }

                if (!iskmperltr && TotalFuel.HasValue && EngHours.HasValue && EngHours.Value > 0)
                {
                    return TotalFuel / EngHours;
                }

                return null;
            }
        }

        public decimal ExpectedAveraged { get; set; }



        public bool IsAverageKm
        {
            get
            {
                return iskmperltr;
            }
            set
            {

                iskmperltr = value;
            }
        }


        public decimal? FuelLost
        {  get => CalculateFuelLost();}

        private decimal? CalculateFuelLost()
        {
            decimal fuellost = 0;

            //find if the vehicle is using km/l
            if (IsAverageKm)
            {
                //calulate fuel lost in km/l
                if (FuelEfficiency.HasValue && FuelEfficiency.Value < ExpectedAveraged)
                {
                    fuellost = TotalFuel.HasValue ? TotalFuel.Value - (TotalDistance ?? 0) / ExpectedAveraged : 0;
                }
            }
            else //caluate fuel in l/hrs
            {
                if (FuelEfficiency.HasValue && FuelEfficiency.Value > ExpectedAveraged)
                {
                    fuellost = TotalFuel.HasValue ? TotalFuel.Value - (ExpectedAveraged * (EngHours ?? 0)) : 0;
                }
            }

            int roundedFuelLost = (int)Math.Round(Math.Abs(fuellost));

            return roundedFuelLost;


        }



    }
}
