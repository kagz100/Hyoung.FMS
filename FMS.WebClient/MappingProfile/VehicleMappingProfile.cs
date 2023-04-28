using AutoMapper;
using FMS.Application.Command.DatabaseCommand.UpdateVehicle;
using FMS.Domain.Entities;
using FMS.WebClient.Models.DatabaseViewModel.VehicleViewModel;

namespace FMS.WebClient.MappingProfile
{
    public class VehicleMappingProfile:Profile
    {

        public VehicleMappingProfile()
        {
            //create map for vehicle
            //map custom vehicleid to VehicleId
       
            CreateMap<Vehicle, VehicleViewModel>()
                .ForMember(dest => dest.VehicleId,opt=>opt.MapFrom(src => src.VehicleId));


            CreateMap<VehicleViewModel, UpdatevehicleCommand>()
             .ForMember(dest => dest.VehicleId, opt => opt.MapFrom(src => src.VehicleId))
       .ForMember(dest => dest.HyoungNo, opt => opt.MapFrom(src => src.HyoungNo))
       .ForMember(dest => dest.VehicleTypeId, opt => opt.MapFrom(src => src.VehicleTypeId))
       .ForMember(dest => dest.VehicleModelId, opt => opt.MapFrom(src => src.VehicleModelId))
       .ForMember(dest => dest.VehicleManufacturerId, opt => opt.MapFrom(src => src.VehicleManufacturerId))
       .ForMember(dest => dest.Yom, opt => opt.MapFrom(src => src.Yom))
       .ForMember(dest => dest.ExpectedAveraged, opt => opt.MapFrom(src => src.ExpectedAveraged))
       .ForMember(dest => dest.DefaultEmployeeId, opt => opt.MapFrom(src => src.DefaultEmployeeId))
       .ForMember(dest => dest.WorkingSiteId, opt => opt.MapFrom(src => src.WorkingSiteId))
       .ForMember(dest => dest.ExcessWorkingHrCost, opt => opt.MapFrom(src => src.ExcessWorkingHrCost))
       .ForMember(dest => dest.AverageKmL, opt => opt.MapFrom(src => src.AverageKmL));
        }



    }

}
