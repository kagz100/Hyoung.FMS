using System;
using System.Collections.Generic;
using System.Text;
using System.Xml.Linq;

namespace FMS.Infrastracture.GPSGateWebService.Interface
{
   public interface IDeserializerReport <T> : IDeserializer<T>
    {
        IList<T> DeserializeTelemetryReport(string xElement);
    }
}
