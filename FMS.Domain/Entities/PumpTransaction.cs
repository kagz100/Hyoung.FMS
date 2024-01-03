using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FMS.Domain.Entities
{
    public class PumpTransaction
    {
        public int Id { get; set; }
        [Required]
        public string? PtsId { get; set; }
        [Required]
        public int PacketId { get; set; }
        public DateTime DateTimeStart { get; set; }
        [Required]

        public DateTime DateTime { get; set; }

        [Required]
        public int Pump { get; set; }
        public int Nozzle { get; set; }
        public int FuelGradeId { get; set; }
        public string? FuelGradeName { get; set; }
        public int Transaction { get; set; }
        [Required]
        public decimal Volume { get; set; }
        public decimal TCVolume { get; set; }
        public decimal Price { get; set; }
        public decimal Amount { get; set; }
        public decimal TotalVolume { get; set; }
        public decimal TotalAmount { get; set; }
        public string? Tag { get; set; }
        public int UserId { get; set; }
        public string? ConfigurationId { get; set; }
    }
}
