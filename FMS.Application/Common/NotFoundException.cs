using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FMS.Application.Common
{
    public class NotFoundException:Exception
    {
        public NotFoundException(string name, object key)
            : base($"Entity \"{name}\" ({key}) was not found.")
        {

        }
    }
    

    }
