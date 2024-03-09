namespace FMS.Domain.ATGStatus.PumpStatus
{
    /// <summary>
    /// Class representing the status of the pumps.
    /// </summary>
    public class PumpStatus
    {
        /// <summary>
        ///  idle status of the pumps
        /// </summary>
        public IdleStatus? IdleStatus { get; set; }
        /// <summary>
        /// Filling status of the pumps.
        /// </summary>
        public FillingStatus? FillingStatus { get; set; }
        /// <summary>
        /// End of transaction status of the pumps.
        /// </summary>
        public EndOfTransactionStatus? EndOfTransactionStatus { get; set; }
        /// <summary>
        /// Offline status of the pumps.
        /// </summary>
        public OfflineStatus? OfflineStatus { get; set; }
    }
}