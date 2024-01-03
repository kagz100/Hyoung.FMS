using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using FMS.Services.Models.ATGModels;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace FMS.Infrastructure.JsonSerialConvertors{
public class AlarmConverter:JsonConverter
{
    public override bool CanConvert(Type objectType)
    {
        return objectType == typeof(Alarm);
    }

    public override object ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer)
    {

      if(reader.TokenType == JsonToken.StartObject)
            {
                //if its an object, consumeme it and possibliy extract the data
                //
                JObject alarmObj = JObject.Load(reader);

                //extract data from the object and create a list <string> of alarms

                List<string> alarms = new List<string>();

                foreach(var prop in alarmObj.Properties())
                {
                    if((bool)prop.Value)
                    {
                        alarms.Add(prop.Name);
                    }
                }

                return new Alarm(alarms);

            }
      else if(reader.TokenType == JsonToken.StartArray)
            {
                //if its an array, consume it and extract the data
                //
                JArray alarmArray = JArray.Load(reader);

                var alarms = alarmArray.ToObject<List<string>>();

                return new Alarm(alarms);
            }
      else
            {
                //if its neither an object nor an array, throw an exception
                //
                throw new JsonSerializationException("Unexpected token type for Alarms:: " + reader.TokenType.ToString());
            }

    }

    public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer)
    {
          Alarm alarm = (Alarm)value;
            serializer.Serialize(writer, alarm.Alarms);
    }
}
}