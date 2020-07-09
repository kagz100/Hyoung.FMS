using FMS.Domain.Entities.Settings;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace FMS.WebClient.Models.Settings
{
    public  class GPSGateConections:IGPSGateConnection
    {
        public int ApplicationID { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
        public string SessionID { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
        public int HandleID { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }

        #region GPSGATE webservice SOAP link 
        public  string DirectoryServiceReferenceLink { get; set; }
        public static string ReportServiceReferenceLink { get; set; }

        public static string TrackServiceReferenceLink { get; set; }

        public static string GeocorderReferenceLink { get; set; }
        


        #endregion

    }
}
