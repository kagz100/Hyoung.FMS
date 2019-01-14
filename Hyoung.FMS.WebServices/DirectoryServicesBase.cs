using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using System.Xml;

namespace Hyoung.FMS.WebServices
{
    public class DirectoryServicesBase
    {
        //private DirectoryServiceReference.Directory _directory = new  DirectoryServiceReference1.Directory();


        private DirectoryServiceReference1.DirectorySoapClient _directoryClient = new DirectoryServiceReference1.DirectorySoapClient(DirectoryServiceReference1.DirectorySoapClient.EndpointConfiguration.DirectorySoap12);

        //singletone instance of directoryservice . 

        
        private static DirectoryServicesBase _directoryServicebase = new DirectoryServicesBase();


        public static DirectoryServicesBase GetSimpleService()
        {
            return _directoryServicebase;
        }



        public string _sessionID;
        public int _applicationID;


        public async Task<string>  Login(string userName, string password , int applicationID)
        {
           Task<System.Xml.Linq.XElement> _xmlresponce = _directoryClient.LoginAsync(userName, password, applicationID);

            _sessionID =  await _xmlresponce.;

            _applicationID = applicationID;

            return _sessionID;
        }



        //public string Login(string userName, string password, int applicationID)
        //{






        //    XmlNode xmlReponce = _directory.Login(userName, password, applicationID);


        //    checkError(xmlReponce);


        //    _sessionID = xmlReponce.InnerText;

        //    _applicationID = applicationID;

        //    return _sessionID;

        //}

        //public static void checkError(XmlNode xmlReponce)
        //{

        //    if (xmlReponce != null && xmlReponce.FirstChild != null && xmlReponce.FirstChild.Name == "exception")
        //    {
        //        throw new Exception(xmlReponce.SelectSingleNode("//exception/message").InnerText);
        //    }


        //}

    }
}
