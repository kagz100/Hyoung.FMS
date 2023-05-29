
using Microsoft.AspNetCore.Identity;

namespace FMS.Domain.Entities.Auth
{
    public class GPSGateUser:IdentityUser
    {
        public string? Password { get; set; }
    }
}
