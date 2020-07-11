using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Hyoung.FMS.WebServices;
using Microsoft.AspNetCore.Mvc;
using DevExtreme.AspNet.Data;
using DevExtreme.AspNet.Mvc;
using Microsoft.AspNetCore.Mvc.TagHelpers.Cache;
using FMS.Domain.TelemetryModel;

namespace Hyoung.FMS.WebClient.Controllers
{
    public class ReportController : Controller
    {

 
        public ReportController()
        {
          //  sessionID = DirectoryServicesBase.SessionID;
        //    applicationID = 12;
        }
        public IActionResult Index()
        {
            return View();
        }

   
        //[HttpGet]
        //public IActionResult GetHeavyReport()
        //{
        //    return  PartialView("HeavyReport", r);
        //}

        //[HttpPost]
        //public IActionResult GenerateReport(Report reports) 
        //{
        //    //hardwire
        //    iHandleID = (int)report.GenerateReportRestAsync(199, reports.StartDate, reports.EndDate).Result;

        //    return RedirectToAction("GetReportAsync");
        //}

     


       
    }
}
