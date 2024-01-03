using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FMS.Services.Models.ATGModels.Probe
{
    public class ProbeMeasurementsResponse
    {
        [JsonProperty("Protocol")]
        public string Protocol { get; set; }

        [JsonProperty("Packets")]
        public List<MeasurementPacket> Packets { get; set; }


    }

    public class MeasurementPacket
    {
        [JsonProperty("Id")]
        public int Id { get; set; }

        [JsonProperty("Type")]
        public string Type { get; set; }

        [JsonProperty("Data")]
        public MeasurementData Data { get; set; }

       
    
    }

    public class MeasurementData
    {

     [JsonProperty("Probe")]
     [Range(1, 50)]
    public int Probe { get; set; }

    [JsonProperty("FuelGradeId")]
    [Range(1, 20)]
    public int? FuelGradeId { get; set; }

     [JsonProperty("FuelGradeName")]
    [StringLength(20)]
    public string? FuelGradeName { get; set; }


    [JsonProperty("Status")]
    [StringLength(7)]
   
    public string? Status { get; set; }



   [JsonProperty("Alarms")]
  // [JsonConverter(typeof(AlarmConverter))]
   public Alarm Alarms { get; set; }

    [JsonProperty("ProductHeight")]
    public double ProductHeight { get; set; }

    [JsonProperty("WaterHeight")]
    public double WaterHeight { get; set; }

    [JsonProperty("Temperature")]
    public double Temperature { get; set; }

    [JsonProperty("LastInTankDeliveryStart")]
    public Delivery LastInTankDeliveryStart { get; set; }

    [JsonProperty("LastInTankDeliveryEnd")]
    public Delivery LastInTankDeliveryEnd { get; set; }

    [JsonProperty("LastInTankDelivery")]
    public Delivery LastInTankDelivery { get; set; }

     public double CalculateTankFillingPercentage()
        {
            
            if(LastInTankDelivery != null)
            {
                double totalHeight = LastInTankDelivery.ProductHeight + LastInTankDelivery.WaterHeight;
                double tankHeight = 0;//TODO: get tank height from Service 

                if(totalHeight >0 && tankHeight > 0)
                {
                    return (totalHeight / tankHeight) * 100;
                }
                else
                {
                    return 0; // Return 0 if calulation is not possible
                }
                 

            }
            else
            {
                return 0;
            }
        }
     
    }



}
