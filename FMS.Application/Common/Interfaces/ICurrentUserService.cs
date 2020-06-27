using System;
using System.Collections.Generic;
using System.Text;

namespace FMS.Application.Common.Interfaces
{
    public interface ICurrentUserService
    {
        string UserID { get; }

        bool IsAuthenticated { get; }
    }
}
