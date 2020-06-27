using System;
using System.Collections.Generic;
using System.Text;
using AutoMapper;
namespace FMS.Application.Common.Mappings
{
   public interface IMapFrom<T>
    {

        void mapping(Profile profile) => profile.CreateMap(typeof(T), GetType());

    }
}
