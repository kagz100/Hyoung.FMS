using Newtonsoft.Json;

namespace FMS.WebClient.Helper
{
    public static  class MessageHelper
    {
        public static string CreateConfirmationMessage(string type, string message ="OK")
        {
            return JsonConvert.SerializeObject(new
            {
                Protocal = "jsonPTS",
                Packets = new[]
                {
                    new {Id=1,Type = type,Message = message }
                }
            });


        }

        public static string CreateErrorMessage(string type,int code, string message )
        {
            return JsonConvert.SerializeObject(new
            {
                Protocal = "jsonPTS",
                Packets = new[]
                {
                    new {Id=1,Type = type,Code =code,  Message = message }
                }
            });
        }

    }
}
