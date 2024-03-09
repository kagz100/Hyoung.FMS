namespace FMS.Domain.ATGStatus.ProbeStatus
{
     /// <summary>
    /// Class representing the online status for probes.
      /// </summary>
    public class OnlineStatus
    {
        /// <summary>
        /// Gets or sets the probe identifiers having online status.
        /// </summary>
        public List<int?>? Ids { get; set; }

        /// <summary>
        /// Gets or sets the identifiers of probes with critical high product alarms for tank.
        /// </summary>
        public List<int?>? CriticalHighProductAlarms { get; set; }

        /// <summary>
        /// Gets or sets the identifiers of probes with high product alarms for tank.
        /// </summary>
        public List<int?>? HighProductAlarms { get; set; }

        /// <summary>
        /// Gets or sets the identifiers of probes with low product alarms for tank.
        /// </summary>
        public List<int?>? LowProductAlarms { get; set; }

        /// <summary>
        /// Gets or sets the identifiers of probes with critical low product alarms for tank.
        /// </summary>
        public List<int?>? CriticalLowProductAlarms { get; set; }

        /// <summary>
        /// Gets or sets the identifiers of probes with high water alarms for tank.
        /// </summary>
        public List<int?>? HighWaterAlarms { get; set; }

        /// <summary>
        /// Gets or sets the identifiers of probes with leakage alarms for tank.
        /// </summary>
        public List<int?>? TankLeakageAlarms { get; set; }

        /// <summary>
        /// Gets or sets the identifiers of probes with errors.
        /// </summary>
        public List<int?>? Errors { get; set; }

        /// <summary>
        /// Gets or sets the measurements of probes.
        /// </summary>
        public List<ProbeMeasurement>? Measurements { get; set; }
    }
}