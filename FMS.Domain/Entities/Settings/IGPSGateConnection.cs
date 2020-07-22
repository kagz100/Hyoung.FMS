using FMS.Domain.Entities.Auth;
using System;
using System.Collections.Generic;
using System.Text;

namespace FMS.Domain.Entities.Settings
{
  public  interface IGPSGateConnection
    {

        public int ApplicationID { get; set; }

        public string SessionID { get; set; }

        public GPSGateUser GPSGateUser { get; set; }
        public int HandleID { get; set; }
    }
}
