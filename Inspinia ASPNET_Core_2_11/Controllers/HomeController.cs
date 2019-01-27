using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Inspinia_ASPNET_Core_2_11.Models;

namespace Inspinia_ASPNET_Core_2_11.Controllers
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
