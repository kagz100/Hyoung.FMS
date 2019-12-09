using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Hyoung.FMS.Model.EntityModel
{
    public class GPSGateUser: IdentityUser
    {


        [Required(ErrorMessage ="Required")]
        public string UserName { get; set; }

        [Required(ErrorMessage = "Required")]

        public string Password { get; set; }

        private string email;

        public string GetEmail()
        {
            return email;
        }

        public void SetEmail(string value)
        {
            email = value;
        }
    }
}
