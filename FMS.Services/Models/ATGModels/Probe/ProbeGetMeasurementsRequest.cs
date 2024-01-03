using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FMS.Services.Models.ATGModels.Probe
{
    public class ProbeGetMeasurementsRequest
    {
        [JsonProperty("Protocol")]
        public string Protocol { get; set; } = "jsonPTS";

        [JsonProperty("Packets")]

        public List<ProbePacket> Packets { get; set; } = new List<ProbePacket>();


        public ProbeGetMeasurementsRequest(int probeId)
        {
            Packets.Add(new ProbePacket
            {
                Id = 1, ///TODO: check this
                Type = "ProbeGetMeasurements",
                Data = new ProbeData
                {
                    Probe = probeId
                }
            });
        }




        public class ProbePacket
        {
            [JsonProperty("Id")]
            public int Id { get; set; }

            [JsonProperty("Type")]
            public string Type { get; set; }

            [JsonProperty("Data")]
            public ProbeData Data { get; set; }

          
        }
        public class ProbeData
        {
            [JsonProperty("Probe")]
            public int Probe { get; set; }
        }
    }
}
