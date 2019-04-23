﻿using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
//using System.Xml;
using System.Xml.Linq;

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


        public  static string _sessionID;
        public int _applicationID;





        public  async Task<string>  Login(string userName, string password , int applicationID)
        {
            
            //var results = await _directoryClient.LoginAsync(userName, password, applicationID);
            
            System.Xml.Linq.XElement _xmlresponce = await _directoryClient.LoginAsync(userName, password, applicationID);


            if (_xmlresponce != null && _xmlresponce.FirstNode != null && _xmlresponce.FirstNode.ToString() == "exception")
            {
                throw new Exception(_xmlresponce.Element("message").Value);
            }

            _sessionID = _xmlresponce.FirstNode.ToString();

            _applicationID = applicationID;

            return _sessionID;
        }

        private void checkError(XElement xmlresponce)
        {
            
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
