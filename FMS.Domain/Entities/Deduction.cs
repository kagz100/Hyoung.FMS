using FMS.Domain.Entities.Common;
using System;
using System.Collections.Generic;
using System.Text;

namespace FMS.Domain.Entities
{
    public class Deduction : Entity

    {

        public decimal Amount { get; set; }

        public DeductionType  DeductionType {get;set;}
    }

    public enum DeductionType
    {
        BasedOnFuelEfficiency,
        Over8hrsDeductions,
        TireUsage
    }

}
