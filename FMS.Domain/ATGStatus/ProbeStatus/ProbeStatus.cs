using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FMS.Domain.ATGStatus.ProbeStatus
{
    public class ProbeStatus
    {
        public OnlineStatus? OnlineStatus { get; set; }
        public OfflineStatus? OfflineStatus { get; set; }
    }
}
