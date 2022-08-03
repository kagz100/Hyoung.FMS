using FMS.Domain.Entities.Auth;
using FMS.Persistence.GPSGateWebService.Interface;
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
using DirectoryReference;
using Microsoft.EntityFrameworkCore;
using FMS.Domain.TelemetryModel;

namespace FMS.Persistence.GPSGateWebService.Service
{
    public class GPSGateDirectoryWebservice : IDirectoryWebservice
    {
       static readonly DirectoryReference.DirectorySoapClient _DirectorySoapClient = new DirectoryReference.DirectorySoapClient(DirectoryReference.DirectorySoapClient.EndpointConfiguration.DirectorySoap12);


        DirectorySoap soapproxy;


        public  GPSGateConections GPSGateConnection { get ; set; }
       

        public GPSGateDirectoryWebservice()
        {

        }
     
          public GPSGateDirectoryWebservice (GPSGateConections gpsgateconnnection)
        {
         //   _DirectorySoapClient.Endpoint.Address.Uri = gpsgateconnnection.DirectoryServiceReferenceLink;
            GPSGateConnection = gpsgateconnnection;

            this.soapproxy = new DirectorySoapClient(DirectorySoapClient.EndpointConfiguration.DirectorySoap);

        }

     

        public void CheckError(XmlNode element)
        {
            if(element !=null && element.FirstChild !=null && element.FirstChild.Name =="exception")
            {
                throw new Exception(element.SelectSingleNode("//exception/message").InnerText);
            }
        }

        public  async Task<string> LoginAsyn(GPSGateConections conn)
        {
            var results = await _DirectorySoapClient.LoginAsync(conn.GPSGateUser.UserName, conn.GPSGateUser.Password, GPSGateConnection.ApplicationID);

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

        public Task<XmlNode> LoginAsync(string strUsername, string strPassword, int iApplicationID)
        {
            return ((DirectorySoap)_DirectorySoapClient).LoginAsync(strUsername, strPassword, iApplicationID);
        }

        public Task<XmlNode> GetLicenseStatusAsync(string strSessionID)
        {
            return ((DirectorySoap)_DirectorySoapClient).GetLicenseStatusAsync(strSessionID);
        }

        public Task<XmlNode> GetGateMessagesByTrackInfoIdAsync(string strSessionID, int iApplicationID, int iTrackInfoID, DateTime dtStart, DateTime dtEnd, int iStartIndex, int iStopIndex, bool bFilterNoneValid, string[] arrFields)
        {
            return ((DirectorySoap)_DirectorySoapClient).GetGateMessagesByTrackInfoIdAsync(strSessionID, iApplicationID, iTrackInfoID, dtStart, dtEnd, iStartIndex, iStopIndex, bFilterNoneValid, arrFields);
        }

        public Task<XmlNode> GetLatestGateRecordsAsync(string strSessionID, int iApplicationID, int iUserID, bool bFilterNotUsed)
        {
            return ((DirectorySoap)_DirectorySoapClient).GetLatestGateRecordsAsync(strSessionID, iApplicationID, iUserID, bFilterNotUsed);
        }

        public Task<XmlNode> GetUpdatedUsersInGroupAsync(string strSessionID, int iApplicationID, string strGroupName, int iStartIndex, int iStopIndex, int iViewID, DateTime dtSince)
        {
            return ((DirectorySoap)_DirectorySoapClient).GetUpdatedUsersInGroupAsync(strSessionID, iApplicationID, strGroupName, iStartIndex, iStopIndex, iViewID, dtSince);
        }

        public Task<XmlNode> GetUsersInGroupAsync(string strSessionID, int iApplicationID, string strGroupName, int iViewID)
        {
            return ((DirectorySoap)_DirectorySoapClient).GetUsersInGroupAsync(strSessionID, iApplicationID, strGroupName, iViewID);
        }

        public Task<XmlNode> GetUsersInUserTagAsync(string strSessionID, int iApplicationID, string strTagName)
        {
            return ((DirectorySoap)_DirectorySoapClient).GetUsersInUserTagAsync(strSessionID, iApplicationID, strTagName);
        }

        public Task<XmlNode> GetUsersInUserTemplateAsync(string strSessionID, int iApplicationID, int iUserTemplateID)
        {
            return ((DirectorySoap)_DirectorySoapClient).GetUsersInUserTemplateAsync(strSessionID, iApplicationID, iUserTemplateID);
        }

        public Task<XmlNode> GetCurrentApplicationsAsync(string strSessionID, int iApplicationID)
        {
            return ((DirectorySoap)_DirectorySoapClient).GetCurrentApplicationsAsync(strSessionID, iApplicationID);
        }

        public Task<XmlNode> SetUserMarkerColorAsync(string strSessionID, int iApplicationID, int iUserID, string strMarkerColor)
        {
            return ((DirectorySoap)_DirectorySoapClient).SetUserMarkerColorAsync(strSessionID, iApplicationID, iUserID, strMarkerColor);
        }

        public Task<XmlNode> SetUserExpectedFuelConsumptionAsync(string strSessionID, int iApplicationID, int iUserID, double dExpectedFuelConsumption)
        {
            return ((DirectorySoap)_DirectorySoapClient).SetUserExpectedFuelConsumptionAsync(strSessionID, iApplicationID, iUserID, dExpectedFuelConsumption);
        }

        public Task<XmlNode> RemoveUserAsync(string strSessionID, int iApplicationID, int iUserID)
        {
            return ((DirectorySoap)_DirectorySoapClient).RemoveUserAsync(strSessionID, iApplicationID, iUserID);
        }

        public Task<XmlNode> SetUserPasswordAsync(string strSessionID, int iApplicationID, int iUserID, string strNewPassword)
        {
            return ((DirectorySoap)_DirectorySoapClient).SetUserPasswordAsync(strSessionID, iApplicationID, iUserID, strNewPassword);
        }

        public Task<XmlNode> GetViewsAsync(string strSessionID, int iApplicationID)
        {
            return ((DirectorySoap)_DirectorySoapClient).GetViewsAsync(strSessionID, iApplicationID);
        }

        public Task<XmlNode> GetTagsInApplicationAsync(string strSessionID, int iApplicationID)
        {
            return ((DirectorySoap)_DirectorySoapClient).GetTagsInApplicationAsync(strSessionID, iApplicationID);
        }

        public Task<XmlNode> SaveTagAsync(string strSessionID, int iApplicationID, int iTagID, string strName, string strDescription, int[] arrUserIDs)
        {
            return ((DirectorySoap)_DirectorySoapClient).SaveTagAsync(strSessionID, iApplicationID, iTagID, strName, strDescription, arrUserIDs);
        }

        public Task<XmlNode> GetDevicesByUserAsync(string strSessionID, int iApplicationID, int iUserID)
        {
            return ((DirectorySoap)_DirectorySoapClient).GetDevicesByUserAsync(strSessionID, iApplicationID, iUserID);
        }

        public Task<XmlNode> GetDeviceCommandStatusAsync(string strSessionID, int iApplicationID, int iDeviceID)
        {
            return ((DirectorySoap)_DirectorySoapClient).GetDeviceCommandStatusAsync(strSessionID, iApplicationID, iDeviceID);
        }

        public Task<XmlNode> ResetCommandQueueAsync(string strSessionID, int iApplicationID, int iDeviceID)
        {
            return ((DirectorySoap)_DirectorySoapClient).ResetCommandQueueAsync(strSessionID, iApplicationID, iDeviceID);
        }

        public Task<SoapDeviceDefinition[]> GetManageableDeviceDefinitionsAsync(string strSessionID, int iApplicationID)
        {
            return ((DirectorySoap)_DirectorySoapClient).GetManageableDeviceDefinitionsAsync(strSessionID, iApplicationID);
        }

        public Task<SoapUserTemplate[]> GetUserTemplatesAsync(string strSessionID, int iApplicationID)
        {
            return ((DirectorySoap)_DirectorySoapClient).GetUserTemplatesAsync(strSessionID, iApplicationID);
        }

        public Task<int> AddUserWithUserTemplateAsync(string strSessionID, int iApplicationID, int iUserTemplateID, string strUsername, string strName, string strPassword, string strDescription)
        {
            return ((DirectorySoap)_DirectorySoapClient).AddUserWithUserTemplateAsync(strSessionID, iApplicationID, iUserTemplateID, strUsername, strName, strPassword, strDescription);
        }

        public Task<XmlNode> AddDeviceAsync(string strSessionID, int iApplicationID, int iOwnerID, string strDeviceName, string strIMEI, string strMSISDN, string strEmail, string strIP, string strPort, string strAPN, string strGPRSUsername, string strGPRSPassword, int iDeviceDefinitionID, int iMobileNetworkID, string strDevicePassword, OneWireBag[] lstOneWireVariables)
        {
            return ((DirectorySoap)_DirectorySoapClient).AddDeviceAsync(strSessionID, iApplicationID, iOwnerID, strDeviceName, strIMEI, strMSISDN, strEmail, strIP, strPort, strAPN, strGPRSUsername, strGPRSPassword, iDeviceDefinitionID, iMobileNetworkID, strDevicePassword, lstOneWireVariables);
        }

        public Task<XmlNode> ChangeUsernameAsync(string strSessionID, int iApplicationID, int iUserID, string strUsername, string strName)
        {
            return ((DirectorySoap)_DirectorySoapClient).ChangeUsernameAsync(strSessionID, iApplicationID, iUserID, strUsername, strName);
        }

        public Task<XmlNode> ChangeUserDescriptionAsync(string strSessionID, int iApplicationID, int iUserID, string strDescription)
        {
            return ((DirectorySoap)_DirectorySoapClient).ChangeUserDescriptionAsync(strSessionID, iApplicationID, iUserID, strDescription);
        }

        public Task<XmlNode> ChangeUserSurnameAsync(string strSessionID, int iApplicationID, int iUserID, string strSurname)
        {
            return ((DirectorySoap)_DirectorySoapClient).ChangeUserSurnameAsync(strSessionID, iApplicationID, iUserID, strSurname);
        }

        public Task<XmlNode> ChangeDriverIDAsync(string strSessionID, int iApplicationID, int iUserID, string strDriverID)
        {
            return ((DirectorySoap)_DirectorySoapClient).ChangeDriverIDAsync(strSessionID, iApplicationID, iUserID, strDriverID);
        }

        public Task<XmlNode> ChangeEmailAsync(string strSessionID, int iApplicationID, int iUserID, string strEmail)
        {
            return ((DirectorySoap)_DirectorySoapClient).ChangeEmailAsync(strSessionID, iApplicationID, iUserID, strEmail);
        }

        public Task<SoapAccumulator> GetAccumulatorAsync(string strSessionID, int iApplicationID, int iUserID, string strName)
        {
            return ((DirectorySoap)_DirectorySoapClient).GetAccumulatorAsync(strSessionID, iApplicationID, iUserID, strName);
        }

        public Task<XmlNode> GetAccumulatorsAsync(string strSessionID, int iApplicationID, int iUserID)
        {
            return ((DirectorySoap)_DirectorySoapClient).GetAccumulatorsAsync(strSessionID, iApplicationID, iUserID);
        }

        public Task<SoapAccumulatorData> GetAccumulatorValueAsync(string strSessionID, int iApplicationID, int iAccumulatorID, DateTime dtTime)
        {
            return ((DirectorySoap)_DirectorySoapClient).GetAccumulatorValueAsync(strSessionID, iApplicationID, iAccumulatorID, dtTime);
        }

        public Task<SoapAccumulatorData> GetLatestAccumulatorValueAsync(string strSessionID, int iApplicationID, int iAccumulatorID)
        {
            return ((DirectorySoap)_DirectorySoapClient).GetLatestAccumulatorValueAsync(strSessionID, iApplicationID, iAccumulatorID);
        }

        public Task SetAccumulatorValueAsync(string strSessionID, int iApplicationID, int iAccumulatorID, double dblValue, DateTime dtTimeOfValue)
        {
            return ((DirectorySoap)_DirectorySoapClient).SetAccumulatorValueAsync(strSessionID, iApplicationID, iAccumulatorID, dblValue, dtTimeOfValue);
        }
    }
}
