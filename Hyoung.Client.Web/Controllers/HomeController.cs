using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Hyoung.Client.Web.Models;
using Hyoung.FMS.WebServices;


namespace Hyoung.Client.Web.Controllers
{
    public class HomeController : Controller
    {

        DirectoryServicesBase directoryServicesBase = new DirectoryServicesBase();


        private readonly int applicationID = 12;

        private  string sessiongID;

        public HomeController ()
        {
           

        }
        public IActionResult Main()
        {



            return View();
        }


        [HttpPost]
        public IActionResult Main(string username, string password )
        {
         

         
            return View();
        }

        public IActionResult Minor()
        {

            return View();
        }

    }
}
