using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FMS.Domain.Entities.Auth
{
    public class GPSGateUser:IdentityUser
    {
        public string Password { get; set; }
    }
}
