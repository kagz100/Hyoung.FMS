using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FMS.Services.Models.ATGModels
{
    public class Alarm
    {

        //convert the array of strings into a Frag Enumration
        public AlarmType AlarmFlags { get;private set; }    

        
        //constructor to parse the arram strings in to the alarm type
        public Alarm (IEnumerable<string> alarmStrings)

        {
            AlarmFlags = AlarmType.None;

            foreach (var alarm in alarmStrings)
            {
                switch (alarm)
                {
                    case "CriticalHighProduct":
                        AlarmFlags |= AlarmType.CriticalHighProduct;
                        break;
                    case "HighProduct":
                        AlarmFlags |= AlarmType.HighProduct;
                        break;
                    case "LowProduct":
                        AlarmFlags |= AlarmType.LowProduct;
                        break;
                    case "CriticalLowProduct":
                        AlarmFlags |= AlarmType.CriticalLowProduct;
                        break;
                    case "HighWater":
                        AlarmFlags |= AlarmType.HighWater;
                        break;
                    case "TankLeakage":
                        AlarmFlags |= AlarmType.TankLeakage;
                        break;
                    default:
                        break;
                }
            }
        }
       
        
        //constructure that accepts a list of string alarms 
        public Alarm(List<string> alarms)
        {
            Alarms = alarms;
        }   

        public bool HasAlarm(AlarmType alarmType)
        {
            return AlarmFlags.HasFlag(alarmType);
        }

        public List<string> Alarms { get; set; }


        
    }



    [Flags]
    public enum AlarmType
    {
        None = 0,
        CriticalHighProduct = 1 << 0,
        HighProduct = 1 << 1,
        LowProduct = 1 << 2,
        CriticalLowProduct = 1 << 3,
        HighWater = 1 << 4,
        TankLeakage = 1 << 5
    }

}

