
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FMS.Domain.ATGStatus.ReaderStatus
{
    public class ReaderStatus
    {
        public OnlineStatus? OnlineStatus { get; set; }
        public OfflineStatus? OfflineStatus { get; set; }
    }
}
