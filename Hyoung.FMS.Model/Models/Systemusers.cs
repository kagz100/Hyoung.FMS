using System;
using System.Collections.Generic;

namespace Hyoung.FMS.Model.Models
{
    public partial class Systemusers
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string RoleId { get; set; }
        public string PhoneNumber { get; set; }
    }
}
