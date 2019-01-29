using System;

namespace Hyoung.FMS.Client.Inspinia.Controllers
{
    public class ErrorViewModel
    {
        public string RequestId { get; set; }

        public bool ShowRequestId => !string.IsNullOrEmpty(RequestId);
    }
}