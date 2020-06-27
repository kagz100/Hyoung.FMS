using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Hyoung.FMS.Core.RestModel;
using Hyoung.FMS.WebServices;
using Microsoft.AspNetCore.Mvc;
using DevExtreme.AspNet.Data;
using DevExtreme.AspNet.Mvc;
using Hyoung.FMS.Core.Preview;
using Microsoft.AspNetCore.Mvc.TagHelpers.Cache;
using Hyoung.FMS.WebClient.Models;

namespace Hyoung.FMS.WebClient.Controllers
{
    public class ReportController : Controller
    {

        private string sessionID;

        private int iHandleID;

        private int applicationID;
        HeavyEquipmentReportPreviewer report;
        public ReportController()
        {
            sessionID = DirectoryServicesBase.SessionID;
            applicationID = 12;
            report = new HeavyEquipmentReportPreviewer(sessionID, 12);
        }
        public IActionResult Index()
        {
            return View();
        }

   
        [HttpGet]
        public IActionResult GetHeavyReport()
        {
            var r  =  report.FetchReport(iHandleID);
            return  PartialView("HeavyReport", r);
        }

        [HttpPost]
        public IActionResult GenerateReport(Report reports) 
        {
            //hardwire
            iHandleID = (int)report.GenerateReportRestAsync(199, reports.StartDate, reports.EndDate).Result;

            return RedirectToAction("GetReportAsync");
        }

     


       
    }
}
