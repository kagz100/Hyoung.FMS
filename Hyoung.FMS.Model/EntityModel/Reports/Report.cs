using System;
using System.Collections.Generic;
using System.Text;

namespace Hyoung.FMS.Model.EntityModel.Reports
{
    public class Report:IReport
    {
        public int reportID { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndEnd { get; set; }

    }

}
