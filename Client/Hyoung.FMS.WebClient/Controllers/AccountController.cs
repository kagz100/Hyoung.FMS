using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Hyoung.FMS.WebClient.Models;
using Hyoung.FMS.WebServices;
using Microsoft.AspNetCore.Mvc;

namespace Hyoung.FMS.WebClient.Controllers
{
    public class AccountController : Controller
    {

        private readonly int applicationID = 12;
        public IActionResult Index()
        {
            return View();
        }
        private string sessionid;

        public IActionResult Login()
        {
            return View();
        }


        [HttpPost]
        public IActionResult Login(GPSUser model)
        {
            if (ModelState.IsValid)
            {

                try
                {
                    var results = DirectoryServicesBase.LoginAsync(model.UserName, model.Password, applicationID);

                     sessionid = results.Result.ToString();
                    ViewBag.Error = DirectoryServicesBase.SessionID;


                    return RedirectToAction("GetReport", "Report");

                }
                catch (Exception e)
                {

                    ModelState.AddModelError(string.Empty, e.Message.ToString());

                    return View();
                    //ViewBag.Error = e.Message.ToString();
                }

            }

            return View();
        }
    }
}
