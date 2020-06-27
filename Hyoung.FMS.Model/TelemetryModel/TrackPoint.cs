using System;
using System.Collections.Generic;
using System.Text;

namespace Hyoung.FMS.Model.TelemetryModel
{
    public class TrackPoint
    {
            public Position TrackPosition { get; set; }
            public string ServerUtc { get; set; }
            public int TrackInfoId { get; set; }
            public string uTC { get; set; }
            public bool valid { get; set; }
            public string[] variables { get; set; }
            public Velocity velocity { get; set; }
        

        public class Position
        {
            public int altitude { get; set; }
            public int latitude { get; set; }
            public int longitude { get; set; }
        }

        public class Velocity
        {
            public int groundSpeed { get; set; }
            public int heading { get; set; }
        }

    }
}
