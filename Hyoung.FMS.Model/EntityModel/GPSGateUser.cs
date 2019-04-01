using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Hyoung.FMS.Model.EntityModel
{
    public class GPSGateUser
    {


        [Required(ErrorMessage ="Required")]
        public String UserName { get; set; }

        [Required(ErrorMessage = "Required")]

        public string Password { get; set; }

        public string Email { get; set; }

    }
}
