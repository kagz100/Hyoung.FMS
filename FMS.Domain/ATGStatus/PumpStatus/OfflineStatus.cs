namespace FMS.Domain.ATGStatus.PumpStatus
{
    /// <summary>
    /// Class representing the offline status for pumps.
    /// </summary>
    public class OfflineStatus
    {
        /// <summary>
        /// Gets or sets the pump identifiers having offline status.
        /// </summary>
        public List<int?>? Ids { get; set; }

        /// <summary>
        /// Gets or sets the users currently executing a request on pumps.
        /// </summary>
        public List<string>? Users { get; set; }
    }
}