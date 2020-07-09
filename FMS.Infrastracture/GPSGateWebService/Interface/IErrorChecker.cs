using System;
using System.Collections.Generic;
using System.Text;
using System.Xml.Linq;

namespace FMS.Infrastracture.GPSGateWebService.Interface
{
    public interface IErrorChecker
    {
        void CheckError(XElement element);
    }
}
