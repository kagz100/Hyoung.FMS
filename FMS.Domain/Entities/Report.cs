using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FMS.Domain.Entities
{
    public class Report
    {
        public int ReportID { get; set; }

        public string ReportName { get; set; }

        public string ReportDescription { get; set; }


        public DateTime StartDate { get; set; }
        public DateTime EndDate
        { get; set; }


    }
}
