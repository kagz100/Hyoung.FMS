using System;
using System.Text.Json.Serialization;
namespace FMS.WebClient.Models.DatabaseViewModel;

public class ConsumptionViewModel
{

    [JsonPropertyName("id")]
    public int Id { get; set; } 

    [JsonPropertyName("vehicleId")]
    public int VehicleId { get; set; }


    [JsonPropertyName("totalFuel")]
    public decimal? TotalFuel { get; set; }

    [JsonPropertyName("workingExpectedAverage")]
    public int? WorkingFuelAverage { get; set; }


    [JsonPropertyName("FuelEfficiency")]
    public decimal? FuelEfficiency { get; set; }

    [JsonPropertyName("workingEmployeesID")]

    public int WorkingEmployee { get; set; }

    [JsonPropertyName("date")]

    public DateTime Date { get; set; }

    [JsonPropertyName("maxSpeed")]

    public decimal? MaxSpeed { get; set; }

    [JsonPropertyName("avgSpeed")]

    public decimal? AvgSpeed { get; set; }

    [JsonPropertyName("fuelLost")]

    public decimal? FuelLost { get; set; }

    [JsonPropertyName("isKmperhr")]

    public bool IsKmperhr { get; set; }

    [JsonPropertyName("isNightShift")]

    public bool IsNightShift { get; set; }

    [JsonPropertyName("workingSiteID")]
    public int SiteID { get; set; }

    [JsonPropertyName("totalDistance")]
    public decimal? TotalDistance { get; set; }

    [JsonPropertyName("flowMeterFuelUsed")]
    public decimal? FlowMeterFuelUsed { get; set; }

    [JsonPropertyName("flowMeterFuelLost")]
    public decimal? FlowMeterFuelLost { get; set; }

    [JsonPropertyName("flowMeterEffiency")]
    public decimal? FlowMeterEffiency { get; set; }

    [JsonPropertyName("engHours")]
    public decimal? EngHours { get; set; }

    [JsonPropertyName("flowMeterEngineHrs")]
    public decimal? FlowMeterEngineHrs { get; set; }

    [JsonPropertyName("excessWorkingHrsCost")]
    public decimal? ExcessWorkingHrsCost { get; set; }
    [JsonPropertyName("isModified")]
    public bool? isModified { get; set; }

}