using FMS.Domain.ATGStatus;
using FMS.Domain.ATGStatus.FuelGradeStatus;
using FMS.Domain.ATGStatus.ProbeStatus;
using FMS.Domain.ATGStatus.PumpStatus;
using FMS.Domain.ATGStatus.ReaderStatus;
using Microsoft.AspNetCore.Components.Forms;
using Microsoft.JSInterop;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Diagnostics.Metrics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FMS.Services.Helper
{
    public class ATGStatusService
    {
        public UploadStatus DeserializeUploadStatus(string json)
        {
            var jObject = JObject.Parse(json);


            var uploadStatus = new UploadStatus
            {
                ConfigurationId = jObject["ConfigurationId"]?.ToString(),
                DateTime = jObject["DateTime"]?.ToObject<DateTime>() ?? default,
                FirmwareDateTime = jObject["FirmwareDateTime"]?.ToObject<DateTime>() ?? default,
                StartupSeconds = jObject["StartupSeconds"]?.ToObject<int>() ?? default,
                BatteryVoltage = jObject["BatteryVoltage"]?.ToObject<int>() ?? default,
                CpuTemperature = jObject["CpuTemperature"]?.ToObject<int>() ?? default,
                PtsPowerDownDetected = jObject["PtsPowerDownDetected"]?.ToObject<bool>()?? false,
                SdMounted = jObject["PtsPowerDownDetected"]?.ToObject<bool>() ?? false,
                Pumps = jObject["Pumps"] != null ? DeserializePumpStatus(jObject["Pumps"].ToString()): null,
                FuelGrades= jObject["FuelGrades"]?.Select(t=>t.ToObject<FuelGradeStatus>()).Where(f=>f!=null).ToList(),
                Readers = jObject["Readers"]!= null ? DeserializeReaderStaus (jObject["Readers"].ToString()):null
            };
            if (jObject["Probes"]?["OnlineStatus"]?["Measurements"] is JArray measurementArray)
            {
                uploadStatus.Probes = new ProbeStatus
                {
                    OnlineStatus = new Domain.ATGStatus.ProbeStatus.OnlineStatus
                    {
                        Measurements = DeserializeProbeMeasurement(measurementArray)
                    }

                };
            }

            return uploadStatus;
        }

        private ReaderStatus DeserializeReaderStaus(string json)
        {
            if(string.IsNullOrEmpty(json))
            {
                return null;
            }
            try
            {
                return JsonConvert.DeserializeObject<ReaderStatus>(json);
            }
            catch (JsonException ex)
            {
                return null;
            }
        }

        private PumpStatus DeserializePumpStatus (string json)
        {
            if(string.IsNullOrEmpty(json))
            {
                return null;
            }

            try
            {
                return JsonConvert.DeserializeObject<PumpStatus>(json);
            }
            catch(JsonException ex)
            {
                return null;
            }
        }


        private List<ProbeMeasurement> DeserializeProbeMeasurement(JArray measurementsArray)
        { 
        
         var measurements = new List<ProbeMeasurement>();

            foreach (var measurement in measurementsArray)
            {
                if(measurement is JArray measurementArray)
                {
                    var measurementValues = measurementArray.Select(jt => jt.Type == JTokenType.Null ? 0.0f : (float)jt).ToArray();
                    measurements.Add(new ProbeMeasurement(measurementValues));
                }
            }
        
            return measurements;
        }
    }
}
