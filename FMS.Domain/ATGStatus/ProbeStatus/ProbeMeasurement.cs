namespace FMS.Domain.ATGStatus.ProbeStatus
{
    public class ProbeMeasurement
    {
        public int ProbeNumber { get; set; }
        public float? ProductHeight { get; set; }
        public float? WaterHeight { get; set; }
        public float? Temperature { get; set; }
        public float? ProductVolume { get; set; }
        public float? WaterVolume { get; set; }
        public float? ProductUllage { get; set; }
        public float? ProductTemperatureCompensatedVolume { get; set; }
        public float? ProductDensity { get; set; }
        public float? ProductMass { get; set; }
        public int? TankFillingPercentage { get; set; }


        public ProbeMeasurement(float[] measurements)
        {
            if (measurements.Length >= 11)
            {
                ProbeNumber = (int)measurements[0];
                ProductHeight = measurements[1];
                WaterHeight = measurements[2];
                Temperature = measurements[3];
                ProductVolume = measurements[4];
                WaterVolume = measurements[5];
                ProductUllage = measurements[6];
                ProductTemperatureCompensatedVolume = measurements[7];
                ProductDensity = measurements[8];
                ProductMass = measurements[9];
                TankFillingPercentage = (int)measurements[10];
            }
        }
    }
}