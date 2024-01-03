using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FMS.Domain.Entities
{
    public partial class PtsTank
    {
        public int PtsId { get; set; }
        public virtual Pts? Pts { get; set; }

        public int TankId { get; set; }
        public virtual Tank? Tank { get; set; }
    }
}
