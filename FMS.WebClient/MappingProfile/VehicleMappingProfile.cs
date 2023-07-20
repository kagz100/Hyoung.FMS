using AutoMapper;
using FMS.Application.Command.DatabaseCommand.ConsumptionCmd;
using FMS.Application.Command.DatabaseCommand.ConsumtionCmd.Update;
using FMS.Application.Command.DatabaseCommand.UpdateVehicle;
using FMS.Application.ModelsDTOs.ExpectedAVG;
using FMS.Domain.Entities;
using FMS.WebClient.Models.DatabaseViewModel;
using FMS.WebClient.Models.DatabaseViewModel.ExpectedViewModel;
using FMS.WebClient.Models.DatabaseViewModel.VehicleViewModel;

namespace FMS.WebClient.MappingProfile
{
    public class VehicleMappingProfile : Profile
    {

        public VehicleMappingProfile()
        {
            //create map for vehicle
            //map custom vehicleid to VehicleId

            CreateMap<Vehicle, VehicleViewModel>()
                .ForMember(dest => dest.VehicleId, opt => opt.MapFrom(src => src.VehicleId));


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




            CreateMap<ExpectedAVGDto, ExpectedAVGViewModel>()
                       .ForMember(dest => dest.ExpectedAverage1, opt => opt.MapFrom(src => src.ExpectedAverage1))
                       .ForMember(dest => dest.ExpectedAverageClassificationId, opt => opt.MapFrom(src => src.ExpectedAverageClassificationId))
                       .ForMember(dest => dest.VehicleId, opt => opt.MapFrom(src => src.VehicleId))
                       .ForMember(dest => dest.SiteId, opt => opt.MapFrom(src => src.SiteId))
                       ;

            // Reverse mapping
            CreateMap<ExpectedAVGViewModel, ExpectedAVGDto>()
                .ForMember(dest => dest.ExpectedAverage1, opt => opt.MapFrom(src => src.ExpectedAverage1))
                .ForMember(dest => dest.ExpectedAverageClassificationId, opt => opt.MapFrom(src => src.ExpectedAverageClassificationId))
                .ForMember(dest => dest.VehicleId, opt => opt.MapFrom(src => src.VehicleId))
                .ForMember(dest => dest.SiteId, opt => opt.MapFrom(src => src.SiteId))
               ;



            CreateMap<ConsumptionViewModel, ComsumptionUpdateCmd>()
              .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
              .ForMember(dest => dest.VehicleId, opt => opt.MapFrom(src => src.VehicleId))
              .ForMember(dest => dest.TotalFuel, opt => opt.MapFrom(src => src.TotalFuel))
              .ForMember(dest => dest.WorkingFuelAverage, opt => opt.MapFrom(src => src.WorkingFuelAverage))
              .ForMember(dest => dest.WorkingEmployee, opt => opt.MapFrom(src => src.WorkingEmployee))
              .ForMember(dest => dest.Date, opt => opt.MapFrom(src => src.Date))
              .ForMember(dest => dest.MaxSpeed, opt => opt.MapFrom(src => src.MaxSpeed))
              .ForMember(dest => dest.AvgSpeed, opt => opt.MapFrom(src => src.AvgSpeed))
              .ForMember(dest => dest.FuelLost, opt => opt.MapFrom(src => src.FuelLost))
              .ForMember(dest => dest.IsKmperhr, opt => opt.MapFrom(src => src.IsKmperhr))
              .ForMember(dest => dest.IsNightShift, opt => opt.MapFrom(src => src.IsNightShift))
              .ForMember(dest => dest.SiteID, opt => opt.MapFrom(src => src.SiteID))
              .ForMember(dest => dest.TotalDistance, opt => opt.MapFrom(src => src.TotalDistance))
              .ForMember(dest => dest.FlowMeterFuelUsed, opt => opt.MapFrom(src => src.FlowMeterFuelUsed))
              .ForMember(dest => dest.FlowMeterFuelLost, opt => opt.MapFrom(src => src.FlowMeterFuelLost))
              .ForMember(dest => dest.FlowMeterEffiency, opt => opt.MapFrom(src => src.FlowMeterEffiency))
              .ForMember(dest => dest.EngHours, opt => opt.MapFrom(src => src.EngHours))
              .ForMember(dest => dest.FlowMeterEngineHrs, opt => opt.MapFrom(src => src.FlowMeterEngineHrs))
              .ForMember(dest => dest.FuelEfficiency, opt => opt.MapFrom(src => src.FuelEfficiency))
              .ForMember(dest => dest.ExcessWorkingHrsCost, opt => opt.MapFrom(src => src.ExcessWorkingHrsCost));

            CreateMap<ConsumptionViewModel, ConsumptionCreateCmd>()
              .ForMember(dest => dest.VehicleId, opt => opt.MapFrom(src => src.VehicleId))
              .ForMember(dest => dest.TotalFuel, opt => opt.MapFrom(src => src.TotalFuel))
              .ForMember(dest => dest.WorkingFuelAverage, opt => opt.MapFrom(src => src.WorkingFuelAverage))
              .ForMember(dest => dest.WorkingEmployee, opt => opt.MapFrom(src => src.WorkingEmployee))
              .ForMember(dest => dest.Date, opt => opt.MapFrom(src => src.Date))
              .ForMember(dest => dest.MaxSpeed, opt => opt.MapFrom(src => src.MaxSpeed))
              .ForMember(dest => dest.AvgSpeed, opt => opt.MapFrom(src => src.AvgSpeed))
              .ForMember(dest => dest.FuelLost, opt => opt.MapFrom(src => src.FuelLost))
              .ForMember(dest => dest.IsKmperhr, opt => opt.MapFrom(src => src.IsKmperhr))
              .ForMember(dest => dest.IsNightShift, opt => opt.MapFrom(src => src.IsNightShift))
              .ForMember(dest => dest.SiteID, opt => opt.MapFrom(src => src.SiteID))
              .ForMember(dest => dest.TotalDistance, opt => opt.MapFrom(src => src.TotalDistance))
              .ForMember(dest => dest.FlowMeterFuelUsed, opt => opt.MapFrom(src => src.FlowMeterFuelUsed))
              .ForMember(dest => dest.FlowMeterFuelLost, opt => opt.MapFrom(src => src.FlowMeterFuelLost))
              .ForMember(dest => dest.FlowMeterEffiency, opt => opt.MapFrom(src => src.FlowMeterEffiency))
              .ForMember(dest => dest.EngHours, opt => opt.MapFrom(src => src.EngHours))
              .ForMember(dest => dest.FlowMeterEngineHrs, opt => opt.MapFrom(src => src.FlowMeterEngineHrs))
              .ForMember(dest => dest.ExcessWorkingHrsCost, opt => opt.MapFrom(src => src.ExcessWorkingHrsCost));
        
    }
    }
}
