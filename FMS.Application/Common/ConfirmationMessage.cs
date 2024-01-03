using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FMS.Application.Common
{
    public static class ConfirmationMessage
    {
        public static string CreateConfirmationMessage(int id ,string type, string message = "OK")
        {
            return JsonConvert.SerializeObject(new
            {
                Protocal = "jsonPTS",
                Packets = new[]
                {
                    new {Id=id,Type = type,Message = message }
                }
            });


        }

        public static string CreateErrorMessage(int id, string type, int code, string message)
        {
            return JsonConvert.SerializeObject(new
            {
                Protocal = "jsonPTS",
                Packets = new[]
                {
                    new {Id=id,Type = type,Code =code,  Message = message }
                }
            });
        }

    }
}


