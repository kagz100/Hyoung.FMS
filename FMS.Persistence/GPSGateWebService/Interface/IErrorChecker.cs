using System;
using System.Collections.Generic;
using System.Text;
using System.Xml;
using System.Xml.Linq;

namespace FMS.Persistence.GPSGateWebService.Interface
{
    public interface IErrorChecker
    {
        void CheckError(XmlNode element);
    }
}
