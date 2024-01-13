using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FMS.Application.Common
{
         /// <summary>
        /// Provides methods to generate success and error confirmation messages in JSON format.
        /// </summary>
        public static class ConfirmationMessage
        {
            /// <summary>
            /// Generates a success confirmation message in JSON format.
            /// </summary>
            /// <param name="id">The ID of the message.</param>
            /// <param name="type">The type of the message.</param>
            /// <param name="message">The message content (optional, default value is "OK").</param>
            /// <returns>A JSON string representing the success confirmation message.</returns>
            public static string Success(int id ,string type, string message = "OK")
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

            /// <summary>
            /// Generates an error message in JSON format.
            /// </summary>
            /// <param name="id">The ID of the error.</param>
            /// <param name="type">The type of the error.</param>
            /// <param name="code">The error code.</param>
            /// <param name="message">The error message.</param>
            /// <returns>A JSON string representing the error message.</returns>
            public static string Error(int id, string type, int code, string message)
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


