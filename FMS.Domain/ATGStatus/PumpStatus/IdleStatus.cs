namespace FMS.Domain.ATGStatus.PumpStatus
{
    public class IdleStatus
    {
        public List<int>? Ids { get; set; }
        public List<int>? NozzlesUp { get; set; }

        public List<int>? LastNozzles { get; set; }

        public List<int>? LastTransactions { get; set; }

        public List<int>? LastVolumes { get; set; }

        public List<int>? LastAmounts { get; set; }

        public List<int>? LastPrices { get; set; }


        /// <summary>
        /// array of strings, which mean tag identifiers currently brought to pump reader 
        /// </summary>
        public List<int>? Tags { get; set; }

        /// <summary>
        /// array of strings, which mean presently executed requests on pumps
        /// </summary>
        public List<int>? Requests { get; set; }



    }
}