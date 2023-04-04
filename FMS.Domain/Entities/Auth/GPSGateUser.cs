using Microsoft.AspNet.Identity.EntityFramework;

namespace FMS.Domain.Entities.Auth
{
    public class GPSGateUser:IdentityUser
    {
        public string Password { get; set; }
    }
}
