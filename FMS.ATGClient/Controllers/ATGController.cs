using Microsoft.AspNetCore.Mvc;

namespace FMS.ATGClient.Controllers
{
    public class ATGController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
