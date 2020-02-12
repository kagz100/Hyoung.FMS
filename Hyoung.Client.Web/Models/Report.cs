using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Hyoung.Client.Web.Models
{
    public class Report
    {

        public int ReportID { get; set; }

        public int ReportTypeID { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

    }
}
