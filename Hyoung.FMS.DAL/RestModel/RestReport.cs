using System;
using System.Collections.Generic;
using System.Reflection.Metadata.Ecma335;
using System.Text;

namespace Hyoung.FMS.DAL.RestModel
{
    public class RestReport
    {

        public int ID { get; set; }

        public string ReportName { get; set; }

        public string Description { get; set; }


        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }


    }
}
