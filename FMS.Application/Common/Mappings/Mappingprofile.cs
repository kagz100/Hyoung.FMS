using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;

namespace FMS.Application.Common.Mappings
{
   public class Mappingprofile: Profile
    {

        public Mappingprofile()
        {
           
        }


        private void ApplyMappingFromAssembly(Assembly assembly)
        {
            var types = assembly.GetExportedTypes()
                .Where(t => t.GetInterfaces().Any(i => i.IsGenericType && i.GetGenericTypeDefinition() == typeof(IMapFrom<>))).ToList();


            foreach(var type in types )
            {
                var instance = Activator.CreateInstance(type);

                var methodInfor = type.GetMethod("Mapping");

                methodInfor?.Invoke(instance, new object[] { this });
            }
        }

    }
}
