using FMS.Domain.ATGStatus;
using System;

namespace FMS.WebClient.Signal;

public class PtsStatusService
{

    private UploadStatus? _currentStatus;

    public void UpdateStatus(UploadStatus status)
    {
        _currentStatus = status;
        // Consider triggering SignalR hub to send updates to clients
         
     }

    public UploadStatus GetCurrentStatus()
    {
        return _currentStatus ?? throw new InvalidOperationException("Status has not been set yet")   ;
    }
}
