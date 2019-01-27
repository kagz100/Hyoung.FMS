using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Hyoung.FMS.webclient.Models;

namespace Hyoung.FMS.webclient.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Main()
        {
            return View();
        }

        public IActionResult Minor()
        {

            return View();
        }

    }
}
