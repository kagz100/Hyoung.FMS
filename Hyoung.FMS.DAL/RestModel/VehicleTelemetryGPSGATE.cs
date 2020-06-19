using Hyoung.FMS.Model.DataAccess;
using Hyoung.FMS.Model.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Xml.Serialization;
namespace Hyoung.FMS.DAL.RestModel
{
    public class VehicleTelemetryGPSGATE
    {
        
        public int ID { get; set; }
       
        public int EngHrsIgnitionHrs { get; set; }

        public int TotalFuelfromFuelProbe { get; set; }
             
        public int EnginehrsFlowmeter { get; set; }
    
        public int TotalFuelFlowmeter { get; set; }

        public string GPSLastLocation { get; set; }

        public int TotalDistance { get; set; }
        public int Avgspeed { get; set; }
        public int MaxSpeed { get; set; }
        public int TotalFuelNormalFlowmeter { get; set; }
        public int TotalFuelIdleFlowmeter { get; set; }
        public int TotalEngHrsNormalFlowmeter { get; set; }
        public int TotalEnghrsIdleFlowmeter { get; set; }
        public DateTime Date { get; set; }



        public Vehicle Vehicle {
            get
            {
                var context = new HyoungGPSContext();

                var vehicle = context.Vehicles.Where(s => s.Id == ID).FirstOrDefault();

                return vehicle;

            }
         }

                                            } }

    }

}
