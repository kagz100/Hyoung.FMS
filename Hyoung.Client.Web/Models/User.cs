using Hyoung.FMS.Model.EntityModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Hyoung.Client.Web.Models
{
    public class User:GPSGateUser
    {
     public  ApplicationSettings settings = new ApplicationSettings();

        public User ()
        {
            settings.ApplicationID = 12;
        }

        public  int applicationId;


    }
}
