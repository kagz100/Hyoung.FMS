﻿using System;
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



        private static DirectoryServiceReference1.DirectorySoapClient _directoryClient = new DirectoryServiceReference1.DirectorySoapClient(DirectoryServiceReference1.DirectorySoapClient.EndpointConfiguration.DirectorySoap12);          

        private  static string _sessionID;
        private  static int _applicationID;



        DirectoryServicesBase ()
        {
        }

        public  static async Task<string>  LoginAsync(string userName, string password , int applicationID)
        {
            
            //var results = await _directoryClient.LoginAsync(userName, password, applicationID);
            
            XmlNode _xmlresponce = await _directoryClient.LoginAsync(userName, password, applicationID);


            //  checkError(_xmlresponce);


            SessionID = _xmlresponce.InnerText;

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

       

        public static string SessionID { get { return _sessionID; } set { _sessionID = value; } }

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
