using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using System.Xml;
//using System.Xml;
using System.Xml.Linq;

namespace Hyoung.FMS.WebServices
{
    public  class DirectoryServicesBase
    {
        //private DirectoryServiceReference.Directory _directory = new  DirectoryServiceReference1.Directory();


        // private DirectoryServiceReference1.DirectorySoapClient _directoryClient = new DirectoryServiceReference1.DirectorySoapClient.EndpointConfiguration(DirectoryServiceReference1.DirectorySoapClient.EndpointConfiguration.DirectorySoap12);

        private static DirectoryServiceReference1.DirectorySoapClient _directoryClient = new DirectoryServiceReference1.DirectorySoapClient(DirectoryServiceReference1.DirectorySoapClient.EndpointConfiguration.DirectorySoap12);


        


        
        private  DirectoryServicesBase _directoryServicebase = new DirectoryServicesBase();


       

        public  static string _sessionID;
        public static int _applicationID;





        public  static async Task<string>  LoginAsync(string userName, string password , int applicationID)
        {
            
            //var results = await _directoryClient.LoginAsync(userName, password, applicationID);
            
            XmlNode _xmlresponce = await _directoryClient.LoginAsync(userName, password, applicationID);


          //  checkError(_xmlresponce);


                _sessionID = _xmlresponce.InnerText;

                _applicationID = applicationID;
            

            return _sessionID;
        }

        private void checkError(XmlNode xml )
        {
            if(xml != null && xml.FirstChild !=null && xml.FirstChild.Name =="exception" )
            {
                throw new Exception(xml.SelectSingleNode("//exception/message").InnerText);
            }

        }

       

        public string SessionID { get { return _sessionID; } }

        public int ApplicationID { get {return _applicationID; } }


        //public static void checkError(XmlNode xmlReponce)
        //{

        //    if (xmlReponce != null && xmlReponce.FirstChild != null && xmlReponce.FirstChild.Name == "exception")
        //    {
        //        throw new Exception(xmlReponce.SelectSingleNode("//exception/message").InnerText);
        //    }


        //}

    }
}
