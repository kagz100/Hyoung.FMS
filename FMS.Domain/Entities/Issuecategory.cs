using FMS.Domain.Entities.Common;
using System;
using System.Collections.Generic;

namespace FMS.Domain.Entities
{
    public partial class Issuecategory :Entity
    {
        public string CategoryName { get; set; }
        public string Description { get; set; }
    }
}
