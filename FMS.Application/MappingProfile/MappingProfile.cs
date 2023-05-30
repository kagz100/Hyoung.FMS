using AutoMapper;
using FMS.Application.Models;
using FMS.Application.Models.Employee;
using FMS.Application.Models.Vehicle;
using FMS.Application.ModelsDTOs.ExpectedAVG;
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
         CreateMap<Employee,EmployeeDto>()
                .ForMember(dest => dest.SiteId, opt => opt.MapFrom(src => src.SiteId))
                
                .ReverseMap();
            CreateMap<Vehicle, SimpleVehicleDto>()
                .ForMember(dest => dest.VehicleId, opt => opt.MapFrom(src => src.VehicleId))
                .ForMember(dest => dest.HyoungNo, opt => opt.MapFrom(src => src.HyoungNo)).ReverseMap();
            
         CreateMap<Vehiclemodel, VehicleModelDto>()
                       .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                       .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                       .ForMember(dest => dest.ManufacturerId, opt => opt.MapFrom(src => src.ManufacturerId));

        CreateMap<VehicleModelDto, Vehiclemodel>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.ManufacturerId, opt => opt.MapFrom(src => src.ManufacturerId));


            CreateMap <Expectedaverage,ExpectedAVGDto>()
                .ForMember(dest=>dest.Id,opt=>opt.MapFrom(src=>src.Id))
                .ForMember(dest => dest.VehicleId, opt => opt.MapFrom(src => src.VehicleId))
                .ForMember(dest => dest.ExpectedAverage1, opt => opt.MapFrom(src => src.ExpectedAverage1))
                .ForMember(dest => dest.ExpectedAverageClassificationId, opt => opt.MapFrom(src => src.ExpectedAverageClassificationId))
                
                
                .ReverseMap();

            CreateMap<Expectedaverageclassification, ExpectedAVGClassficationDTO>().ReverseMap();

        }
    }
}
