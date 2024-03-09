using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.NetworkInformation;
using System.Reflection.Metadata.Ecma335;
using System.Text;
using System.Threading.Tasks;
using FMS.Domain.ATGStatus.FuelGradeStatus;
using FMS.Domain.ATGStatus.ProbeStatus;
using FMS.Domain.ATGStatus.PumpStatus;

namespace FMS.Domain.ATGStatus
{
    public class UploadStatus
    {
        public string? ConfigurationId { get; set; }
        public DateTime DateTime { get; set; }

        public  DateTime FirmwareDateTime { get; set; }

        public int StartupSeconds { get; set; }

        public int BatteryVoltage { get; set; }
        public int CpuTemperature { get; set; }
        public bool PtsPowerDownDetected { get; set; }
        public bool SdMounted { get; set; }

        public PumpStatus.PumpStatus? Pumps { get; set; }
        public  ProbeStatus.ProbeStatus? Probes { get; set; }

        //public PriceBoardStatus PriceBoards { get; set; }

        public ReaderStatus.ReaderStatus? Readers { get; set; }
      //  public GpsStatus Gps { get; set; }
        public List<FuelGradeStatus.FuelGradeStatus>? FuelGrades { get; set; }


    }
}
