using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace FMS.Application.CommonInterface
{
    public interface IGpsGateAccessDirectory
    {

        public Task<string> LoginAsync(string userName, string password, int applicationID);

    }
}
