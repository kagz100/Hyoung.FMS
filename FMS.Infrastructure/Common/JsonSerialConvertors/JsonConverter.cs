using FMS.Infrastructure.JsonSerialConvertors;
using FMS.Services.Common.Interfaces;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FMS.Infrastructure.Common.JsonSerialConvertors
{
    public class CustomJsonConverter : IJsonConvertor
    {

        private readonly JsonSerializerSettings _settings;


        public CustomJsonConverter()
        {
            _settings = new JsonSerializerSettings
            {
                Converters = new List<JsonConverter> { new AlarmConverter() },
            };

        }

        public T Deserialize<T>(string json)
        {

            return JsonConvert.DeserializeObject<T>(json, _settings);
        }

        public string Serialize(object obj)
        {
            return JsonConvert.SerializeObject(obj, _settings);
        }
    }

}

