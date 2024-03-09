namespace FMS.Domain.ATGStatus.ReaderStatus
{
    /// <summary>
    /// Class representing the offline status for readers.
    /// </summary>
    public class OfflineStatus
    {
        /// <summary>
        /// Gets or sets the reader identifiers having offline status.
        /// </summary>
        public List<int?>? Ids { get; set; }
    }
}