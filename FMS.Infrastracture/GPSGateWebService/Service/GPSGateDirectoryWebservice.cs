using FMS.Domain.Entities.Auth;
using FMS.Infrastracture.GPSGateWebService.Interface;
using FMS.WebClient.Models.Settings;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;
using System.Configuration;
using Microsoft.Extensions.Configuration;
using System.Xml;
using System.ServiceModel;

namespace FMS.Infrastracture.GPSGateWebService.Service
{
    public class GPSGateDirectoryWebservice : IDirectoryWebservice
    {
       static readonly GpsGateWCFServiceReference1.DirectorySoapClient _DirectorySoapClient = new GpsGateWCFServiceReference1.DirectorySoapClient(GpsGateWCFServiceReference1.DirectorySoapClient.EndpointConfiguration.DirectorySoap12);





        public  GPSGateConections GPSGateConnection { get ; set; }

        public GPSGateDirectoryWebservice (GPSGateConections gpsgateconnnection)
        {
            GPSGateConnection = gpsgateconnnection;
        }

     

        public void CheckError(XmlNode element)
        {
            if(element !=null && element.FirstChild !=null && element.FirstChild.Name =="exception")
            {
                throw new Exception(element.SelectSingleNode("//exception/message").InnerText);
            }
        }

        public  async Task<string> LoginAsyn(GPSGateUser user)
        {
            var results = await _DirectorySoapClient.LoginAsync(user.UserName, user.Password, GPSGateConnection.ApplicationID);

            try
            {
                CheckError(results);
            }
            catch(Exception e)
            {
                return e.Message;
            }

            return results.Value;

        }

       
    }
}
