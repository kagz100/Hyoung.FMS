using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FMS.Services.Common.Interfaces
{
    public interface IJsonConvertor
    {

        T Deserialize<T>(string json);

        string Serialize(object obj);

    }
}
