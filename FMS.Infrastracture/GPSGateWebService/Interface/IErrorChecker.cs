﻿using System;
using System.Collections.Generic;
using System.Text;
using System.Xml;
using System.Xml.Linq;

namespace FMS.Infrastracture.GPSGateWebService.Interface
{
    public interface IErrorChecker
    {
        void CheckError(XmlNode element);
    }
}
