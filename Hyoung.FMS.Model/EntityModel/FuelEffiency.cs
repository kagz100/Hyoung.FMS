namespace Hyoung.FMS.Model.EntityModel
{
    public class FuelEffiency
    {

        public int FuelEffID { get; set; }

        public Calibration FuelValues { get; set; }

        public int FuelEfficiency { get; set; }

        public enum FuelMeasureType {EngineHours, Odometer  }
    }
}