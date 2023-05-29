using System;
using System.Collections.Generic;
using System.Text;



namespace FMS.Domain.Entities.Auth
{
    ///Gps Connection 

    
    public class GPSGateConections
    {
        public int ApplicationID { get ; set ; }
        public string? SessionID { get ; set ; }
        public int HandleID { get ; set ; }
        public GPSGateUser? GPSGateUser { get ; set ; }

        #region GPSGATE webservice SOAP link 
        public string? DirectoryServiceReferenceLink { get; set; }
        public static string? ReportServiceReferenceLink { get; set; }

        public static string? TrackServiceReferenceLink { get; set; }

        public static string? GeocorderReferenceLink { get; set; }

        #endregion


    }
}
