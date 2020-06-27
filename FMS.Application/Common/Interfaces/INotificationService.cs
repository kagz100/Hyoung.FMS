using FMS.Application.Notification.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace FMS.Application.Common.Interfaces
{
  public  interface INotificationService
    {
        Task SendAsync(MessageDTO message);

    }
}
