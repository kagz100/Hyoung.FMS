using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;

namespace FMS.Domain.Entities
{
    public partial class SystemUsers : IdentityUser
    {
         public string? FirstName { get; set; }
        public string? LastName { get; set; }
    
    }
}
