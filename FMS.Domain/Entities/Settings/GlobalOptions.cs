using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace FMS.WebClient.Models.Settings
{
    public static class GlobalOptions
    {

        public static string MainConnectionString { get; set; }

        public static int GPSGateApplicationID { get; set; }

        public static string SessionID { get; set; }


        public static int IHandle { get; set; }




        #region GPSGATE webservice SOAP link 
      /public static string DirectoryServiceReferenceLink { get; set; }
        public static string ReportServiceReferenceLink { get; set; }

        public static string TrackServiceReferenceLink { get; set; }

        public static string GeocorderReferenceLink { get; set; }


        #endregion

    }
}
