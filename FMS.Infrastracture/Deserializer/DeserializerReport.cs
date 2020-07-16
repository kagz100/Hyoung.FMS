using FMS.Infrastracture.GPSGateWebService.Interface;
using System;
using System.Collections.Generic;
using System.Text;
using System.Xml;
using System.Xml.Linq;
using System.Xml.Serialization;

namespace FMS.Infrastracture.Deserializer
{
    public class DeserializerReport<T> : IDeserializerReport<T>
    {



        /// <summary>
        /// Takes XML soap that contains Report data and serialize it 
        /// </summary>
        /// <param name="xElement"></param>
        /// <returns></returns
        public IList<T> DeserializeTelemetryReport(string xElement)
        {
            var mydeserializer = new XmlSerializer(typeof(T));

            XmlReader reader = XmlReader.Create(xElement);

            return  (List<T>)mydeserializer.Deserialize(reader);
        }

        public T DeserialiseSingleObjects(string xelement )
        {
            var mydeserialiser = new XmlSerializer(typeof(T));


            XmlReader reader = XmlReader.Create(xelement);

               return (T)mydeserialiser.Deserialize(reader);
        }

       
    }
}
