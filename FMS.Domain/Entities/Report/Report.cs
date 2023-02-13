using FMS.Domain.Entities.Common;
using System;
using System.Collections.Generic;
using System.Text;

namespace FMS.Domain.Entities.Report
{

    /// <summary>
    /// This class should only interract with the database
    /// </summary>
    public partial class Report:Entity
    {
        public string ReportName { get; set; }
        public string ReportDescription { get; set; }
        
    }
}
