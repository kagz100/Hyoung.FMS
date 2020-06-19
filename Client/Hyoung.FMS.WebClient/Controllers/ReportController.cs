using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Hyoung.FMS.DAL.RestModel;
using Hyoung.FMS.WebServices;
using Microsoft.AspNetCore.Mvc;
using DevExtreme.AspNet.Data;
using DevExtreme.AspNet.Mvc;
using Hyoung.FMS.DAL.Preview;
using Microsoft.AspNetCore.Mvc.TagHelpers.Cache;

namespace Hyoung.FMS.Webclient.Controllers
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
        public async Task<List<VehicleUsageReportFromGPSGATE>> GetReportAsync()
        {
            var r = await report.FetchReport();
            return  r;
        }

        [HttpPost]
        public  IActionResult HeavyReport(DateTime startTime,DateTime endTime)
        {
            //hardwire
            iHandleID = (int)report.GenerateReportRestAsync(199,startTime, endTime).Result;

            return RedirectToAction("GetReportAsync");
        }

     
       
    }
}
