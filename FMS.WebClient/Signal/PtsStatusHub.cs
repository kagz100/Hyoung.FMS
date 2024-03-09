using Microsoft.AspNetCore.SignalR;
using System.CodeDom;
namespace FMS.WebClient.Signal
{
    public class PtsStatusHub:Hub
    {

        private readonly PtsStatusService _statusService;

        public PtsStatusHub(PtsStatusService statusService)
        {
            _statusService = statusService;
        }
        public async Task SendStatusUpdate()
        {

            var status = _statusService.GetCurrentStatus();
            await Clients.All.SendAsync("ReceiveStatus", status);
        }



    }
}
