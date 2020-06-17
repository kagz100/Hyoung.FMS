using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Hyoung.FMS.DAL.RestModel;
using Hyoung.FMS.WebServices;
using Microsoft.AspNetCore.Mvc;

namespace Hyoung.FMS.Webclient.Controllers
{
    public class ReportController : Controller
    {

        private string sessionID;

        private int iHandleID;

        private int applicationID;

        public  ReportController()
        {
            sessionID = DirectoryServicesBase.SessionID;
        }
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult GetReport()
        {
            return View();
        }

        [HttpPost]
        public IActionResult GetReport(VehicleUsageReportFromGPSGATE vehicleUsage)
        {



            return View();
        }
    }
}
