using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FMS.Application.ModelsDTOs.ATG.Common
{
    public class PtsRequestDto
    {
        public string Protocol { get; set; }
        public string PtsId { get; set; }
        public List<PacketDto> Packets { get; set; }
    }

    public class PacketDto
    {
        public int Id { get; set; }
        public string Type { get; set; }
        public JObject Data { get; set; } // List of JObject
    }
}
