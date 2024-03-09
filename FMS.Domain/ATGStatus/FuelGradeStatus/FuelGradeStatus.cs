using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FMS.Domain.ATGStatus.FuelGradeStatus
{
    /// <summary>
    /// Class representing the configuration of fuel grades.
    /// </summary>
    public class FuelGradeStatus
    {
        /// <summary>
        /// Gets or sets the identifier of the fuel grade.
        /// </summary>
        public int? Id { get; set; }

        /// <summary>
        /// Gets or sets the name of the fuel grade.
        /// </summary>
        public string? Name { get; set; }

        /// <summary>
        /// Gets or sets the price of the fuel grade.
        /// </summary>
        public float? Price { get; set; }

        /// <summary>
        /// Gets or sets the thermal coefficient of expansion at 15 °C for the fuel grade.
        /// </summary>
        public float? ExpansionCoefficient { get; set; }

        /// <summary>
        /// Gets or sets the identifier of the first tank for blended fuel grade.
        /// </summary>
        public int? BlendTank1Id { get; set; }

        /// <summary>
        /// Gets or sets the blend percentage from the first tank for blended fuel grade.
        /// </summary>
        public int? BlendTank1Percentage { get; set; }

        /// <summary>
        /// Gets or sets the identifier of the second tank for blended fuel grade.
        /// </summary>
        public int? BlendTank2Id { get; set; }
    }
}
