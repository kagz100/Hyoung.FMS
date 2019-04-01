using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Hyoung.Client.Web.Models;
using Hyoung.FMS.Model.EntityModel;
using Hyoung.FMS.WebServices;
using Microsoft.AspNetCore.Mvc;

namespace Hyoung.Client.Web.Controllers
{
    public class AccountController : Controller
    {

        DirectoryServicesBase directoryServicesBase = new DirectoryServicesBase();

        private readonly int applicationID = 12;

        private string sessiongID;

        public IActionResult Index()
        {
            
            return View();
        }


        public IActionResult Login()
        {
            return View();
        }


        [HttpPost]
        public IActionResult Login(GPSGateUser model)
        {
            if (ModelState.IsValid)
            {

                try
                {
                    var results = directoryServicesBase.Login(model.UserName, model.Password, applicationID);
                    string sessiongID = results.Result.ToString();


                }
                catch (Exception e)
                {
                    ViewBag.Error = e.Message.ToString();
                }

            }

            return View();
        }

    }
}