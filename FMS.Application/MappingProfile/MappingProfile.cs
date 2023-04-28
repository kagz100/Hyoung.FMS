using AutoMapper;
using FMS.Application.Models;
using FMS.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FMS.Application.MappingProfile
{
    public class MappingProfile:Profile
    {
        public MappingProfile() { 
        
        CreateMap<Vehicle,VehicleListDTO>().ReverseMap();


            CreateMap<Vehiclemodel, VehicleModelDto>()
                       .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                       .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                       .ForMember(dest => dest.ManufacturerId, opt => opt.MapFrom(src => src.ManufacturerId));

            CreateMap<VehicleModelDto, Vehiclemodel>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.ManufacturerId, opt => opt.MapFrom(src => src.ManufacturerId));



        }
    }
}
