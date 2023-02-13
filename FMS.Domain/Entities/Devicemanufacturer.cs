using System;
using System.Collections.Generic;

namespace FMS.Domain.Entities
{
    /// <summary>
    /// stores information about the GPS device manufacturer
    /// </summary>
    public partial class Devicemanufacturer
    {
        public int Id { get; set; }

        public string? Name { get; set; }

        public virtual ICollection<Devicemodel> Devicemodels { get; } = new List<Devicemodel>();
    }
}