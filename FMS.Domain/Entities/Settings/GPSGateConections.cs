using FMS.Domain.Entities.Auth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace FMS.WebClient.Models.Settings
{
    public  class GPSGateConections
    {
        public int ApplicationID { get; set; }
        public string SessionID { get; set ; }
        public int HandleID { get; set ; }
        public GPSGateUser GPSGateUser { get ; set; }

          }
}
