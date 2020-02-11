using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Xml.Serialization;

namespace Hyoung.FMS.DAL
{
  public class XMLSoapSerializer
    {


        public T Deserializer<T> (string input) where T :class
        {
            XmlSerializer xmlSerializer = new XmlSerializer(typeof(T));

            using(StringReader sr = new StringReader(input))
            {
                return (T)xmlSerializer.Deserialize(sr);
            }

        }

    }
}
