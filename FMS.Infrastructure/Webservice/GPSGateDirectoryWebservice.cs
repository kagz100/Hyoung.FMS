﻿using FMS.Domain.Entities.Auth;
using FMS.Domain.Entities.Common.Interface;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using System.Xml;

namespace FMS.Infrastructure.Webservice
{
     public class GPSGateDirectoryWebservice : IGPSGateDirectoryWebservice
    {
        static readonly DirectoryServiceReference1.DirectorySoapClient _DirectorySoapClient = new DirectoryServiceReference1.DirectorySoapClient(DirectoryServiceReference1.DirectorySoapClient.EndpointConfiguration.DirectorySoap12);
        static readonly ReportingServiceReference.ReportingSoapClient _ReportSoapClient = new ReportingServiceReference.ReportingSoapClient(ReportingServiceReference.ReportingSoapClient.EndpointConfiguration.ReportingSoap12);

        public async Task<string> LoginAsyn(GPSGateConections conn)
        {
            var results = await _DirectorySoapClient.LoginAsync(conn.GPSGateUser.UserName, conn.GPSGateUser.Password, conn.ApplicationID);

            try
            {
                CheckError(results);
            }
            catch(Exception e)
            {
                return e.Message;
            }

            var xmlDoc = new XmlDocument();

            xmlDoc.LoadXml(results.OuterXml);

            var sessionIDNode = xmlDoc.SelectSingleNode("//sessionId");



            return results.Name;
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="conn"></param>
        /// <param name="from"></param>
        /// <param name="to"></param>
        /// <returns></returns>

        public async Task<string> GetFuelConsumptionReport(GPSGateConections conn,int FuelConsumptionReportID, DateTime from, DateTime to)
        {
            //Get FuelconsumptionReport ID from Database


            
            var results = await _ReportSoapClient.GenerateReportAsync(conn.SessionID, 208, from, to);
            try
            {
               //chcke for errors
            }
            catch (Exception e)
            {
                return e.Message;
            }
            
            return results.ToString();

        }


            public void CheckError(XmlNode element)
        {
            if (element != null && element.FirstChild != null && element.FirstChild.Name == "exception")
            {
                throw new Exception(element.SelectSingleNode("//exception/message").InnerText);
            }
        }

        public Task<string> GetFuelconsumptionReport(GPSGateConections conn, int FuelConsumptionReportID, DateTime from, DateTime to)
        {
            throw new NotImplementedException();
        }
    }
}
