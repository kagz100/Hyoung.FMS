namespace FMS.Domain.ATGStatus.PumpStatus
{// <summary>
    /// Class representing the end of transaction status for pumps.
    /// </summary>
    public class EndOfTransactionStatus
    {
        /// <summary>
        /// Gets or sets the pump identifiers having filling status.
        /// </summary>
        public List<int>? Ids { get; set; }

        /// <summary>
        /// Gets or sets the active nozzle numbers of the pumps.
        /// </summary>
        public List<int>? Nozzles { get; set; }

        /// <summary>
        /// Gets or sets the identifiers of the active nozzles' fuel grade.
        /// </summary>
        public List<int>? FuelGradeIds { get; set; }

        /// <summary>
        /// Gets or sets the names of the active nozzles' fuel grade.
        /// </summary>
        public List<string>? FuelGradeNames { get; set; }

        /// <summary>
        /// Gets or sets the active transaction numbers of the pumps.
        /// </summary>
        public List<int>? Transactions { get; set; }

        /// <summary>
        /// Gets or sets the dispensed volumes of the pumps.
        /// </summary>
        public List<float>? Volumes { get; set; }

        /// <summary>
        /// Gets or sets the dispensed amounts of the pumps.
        /// </summary>
        public List<float>? Amounts { get; set; }

        /// <summary>
        /// Gets or sets the active product prices of the pumps.
        /// </summary>
        public List<float>? Prices { get; set; }

        /// <summary>
        /// Gets or sets the tag identifiers used to authorize the pump.
        /// </summary>
        public List<string>? Tags { get; set; }
    }
}