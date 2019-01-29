using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Inspinia_ASPNET_Core_2_11.Models;
using Hyoung.FMS.Model.EntityModel.Reports;

namespace Inspinia_ASPNET_Core_2_11.Controllers
{
    public class HomeController : Controller
    {


        IReport<FuelConsumptionReportLightVehicles> LIght_vehicle_FuelReport = new IReport<FuelConsumptionReportLightVehicles>();



        public IActionResult Main()
        {

            var LightvehicleReport = GetFuelReportData();

            return View();
        }

        private List<FuelConsumptionReportLightVehicles> GetFuelReportData()
        {


        }

        public IActionResult Minor()
        {

            return View();
        }

    }
}
