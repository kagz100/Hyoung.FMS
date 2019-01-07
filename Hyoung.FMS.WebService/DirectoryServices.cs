using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml;

namespace Hyoung.FMS.WebService
{
     public class DirectoryServicesBase
    {
        private   DirectoryServiceReference.Directory _directory = new DirectoryServiceReference.Directory();




        //singletone instance of directoryservice . 

        private static DirectoryServicesBase _directoryServicebase = new DirectoryServicesBase();


       public static DirectoryServicesBase GetSimpleService ()
        {
            return _directoryServicebase; 
        }



        public string _sessionID;
        public int _applicationID;

        public string Login (string  userName,string password , int applicationID)
        {


            XmlNode xmlReponce =_directory.Login(userName, password, applicationID);


            checkError(xmlReponce);


            _sessionID = xmlReponce.InnerText;

            _applicationID = applicationID;

            return _sessionID;

        }

        public static void checkError(XmlNode xmlReponce)
        {

             if(xmlReponce != null && xmlReponce.FirstChild !=null && xmlReponce.FirstChild.Name== "exception")
            {
                throw new Exception(xmlReponce.SelectSingleNode("//exception/message").InnerText);
            }


        }
    }
}
