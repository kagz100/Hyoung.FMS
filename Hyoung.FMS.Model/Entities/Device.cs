using System;
using System.Collections.Generic;
using System.Text;

namespace Hyoung.FMS.Domain.Entities
{
    public class Device
    {
     
            public DateTime created { get; set; }
            public string name { get; set; }
            public bool hidePosition { get; set; }
            public int proximity { get; set; }
            public string imei { get; set; }
            public string PhoneNo { get; set; }
            public string email { get; set; }
            public string apn { get; set; }
            public string gprsUsername { get; set; }
            public string gprsPassword { get; set; }
            public string lastIP { get; set; }
            public int lastPort { get; set; }
            public string staticIP { get; set; }
            public int staticPort { get; set; }
            public string protocolID { get; set; }
            public int profileId { get; set; }
            public int protocolVersionID { get; set; }
            public int msgFieldDictionaryID { get; set; }
            public int deviceDefinitionID { get; set; }
            public int mobileNetworkID { get; set; }
            public int longitude { get; set; }
            public int latitude { get; set; }
            public DateTime timeStamp { get; set; }
            public int ownerID { get; set; }
            public string ownerUsername { get; set; }
            public string ownerName { get; set; }
            public string ownerEmail { get; set; }
            public string devicePassword { get; set; }
            public object[] oneWireVariables { get; set; }
             
    }
}
