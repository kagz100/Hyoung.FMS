namespace FMS.Domain.ATGStatus.ReaderStatus
{

    /// <summary>
    /// Class representing the online status of the readers.
    /// </summary>
    public class OnlineStatus
    {/// <summary>
     /// Gets or sets the reader identifiers having online status.
     /// </summary>
        public List<int?>? Ids { get; set; }

        /// <summary>
        /// Gets or sets the IDs of the readers' tags.
        /// </summary>
        public List<string>? Tags { get; set; }

        /// <summary>
        /// Gets or sets the identifiers of readers having error status.
        /// </summary>
        public List<int?>? Errors { get; set; }
    }
}