using AutoMapper;
using FMS.Application.Command.DatabaseCommand.ConsumtionCmd.Update;
using FMS.Application.Models;
using FMS.Application.Models.Employee;
using FMS.Application.Models.Vehicle;
using FMS.Application.ModelsDTOs.ATG;
using FMS.Application.ModelsDTOs.Consumption;
using FMS.Application.ModelsDTOs.ExpectedAVG;
using FMS.Domain.Entities;
using FMS.Services.GPSServiceModels;
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


           
    
        
        CreateMap<Vehicle,VehicleListDTO>()
                
              .ForMember(dest=>dest.VehicleId,opt =>opt.MapFrom(src =>src.VehicleId))
             .ForMember(dest => dest.VehicleManufacturerId, opt => opt.MapFrom(src => src.VehicleManufacturer.Id))
             .ForMember(dest => dest.DefaultExpectedAverageId, opt => opt.MapFrom(src => src.DefaultExptdAvg.Id))
             .ForMember(dest => dest.ExpectedAverageclassificationName, opt => opt.MapFrom(src => src.DefaultExptdAvg.ExpectedAverageClassification.Name))
             .ForMember(dest => dest.ExpectedAverageValue, opt => opt.MapFrom(src => src.DefaultExptdAvg.ExpectedAverageValue))
             // .ForMember(dest => dest.VehicleId, opt => opt.MapFrom(src => src.VehicleId))
             //.ForMember(dest => dest.VehicleId, opt => opt.MapFrom(src => src.VehicleId))
             //.ForMember(dest => dest.VehicleId, opt => opt.MapFrom(src => src.VehicleId))
             //.ForMember(dest => dest.VehicleId, opt => opt.MapFrom(src => src.VehicleId))
             // .ForMember(dest => dest.VehicleId, opt => opt.MapFrom(src => src.VehicleId))
             //.ForMember(dest => dest.VehicleId, opt => opt.MapFrom(src => src.VehicleId))
             //.ForMember(dest => dest.VehicleId, opt => opt.MapFrom(src => src.VehicleId))
             //.ForMember(dest => dest.VehicleId, opt => opt.MapFrom(src => src.VehicleId))
             // .ForMember(dest => dest.VehicleId, opt => opt.MapFrom(src => src.VehicleId))
             //.ForMember(dest => dest.VehicleId, opt => opt.MapFrom(src => src.VehicleId))
             //.ForMember(dest => dest.VehicleId, opt => opt.MapFrom(src => src.VehicleId))
             //.ForMember(dest => dest.VehicleId, opt => opt.MapFrom(src => src.VehicleId))




                .ReverseMap();

         CreateMap<Employee,EmployeeDto>()
                .ForMember(dest => dest.SiteId, opt => opt.MapFrom(src => src.SiteId))
                .ForMember(dest => dest.FullName, opt => opt.MapFrom(src => src.FullName))
                .ForMember(dest => dest.EmployeeWorkNo, opt => opt.MapFrom(src => src.EmployeeWorkNo))
               .ForMember(dest => dest.EmployeephoneNumber, opt => opt.MapFrom(src => src.EmployeephoneNumber))
                .ForMember(dest => dest.Employeestatus, opt => opt.MapFrom(src => src.Employeestatus))
                  .ForMember(dest => dest.NationalId, opt => opt.MapFrom(src => src.NationalId))         
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
                .ForMember(dest => dest.ExpectedAverageValue, opt => opt.MapFrom(src => src.ExpectedAverageValue))
                .ForMember(dest => dest.ExpectedAverageClassificationId, opt => opt.MapFrom(src => src.ExpectedAverageClassificationId))       
                .ForMember(dest => dest.ExpectedAverageclassificationName, opt => opt.MapFrom(src => src.ExpectedAverageClassification.Name))
                
                .ReverseMap();

            CreateMap<Expectedaverageclassification, ExpectedAVGClassficationDTO>().ReverseMap();


            CreateMap<Vehicleconsumption, HistoryConsumptionDTO>()
      .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
      .ForMember(dest => dest.TotalFuel, opt => opt.MapFrom(src => src.TotalFuel))
      .ForMember(dest => dest.ExpectedAveraged, opt => opt.MapFrom(src => src.ExpectedConsumption))
      .ForMember(dest => dest.Employee, opt => opt.MapFrom(src => src.Employee != null ? src.Employee.FullName : string.Empty))
      .ForMember(dest => dest.Site, opt => opt.MapFrom(src => src.Site.Name))
      .ForMember(dest => dest.ExcessWorkingHrCost, opt => opt.MapFrom(src => src.ExcessWorkingHrsCost))
      .ForMember(dest => dest.Date, opt => opt.MapFrom(src => src.Date))
      .ForMember(dest => dest.MaxSpeed, opt => opt.MapFrom(src => src.MaxSpeed))
      .ForMember(dest => dest.AvgSpeed, opt => opt.MapFrom(src => src.AvgSpeed))
      .ForMember(dest => dest.TotalDistance, opt => opt.MapFrom(src => src.TotalDistance))
      .ForMember(dest => dest.FlowMeterFuelUsed, opt => opt.MapFrom(src => src.FlowMeterFuelUsed))
      .ForMember(dest => dest.FlowMeterFuelLost, opt => opt.MapFrom(src => src.FlowMeterFuelLost))
      .ForMember(dest => dest.FlowMeterEngineHrs, opt => opt.MapFrom(src => src.FlowMeterEngineHrs))
      .ForMember(dest => dest.IsAverageKm, opt => opt.MapFrom(src => src.IsKmperhr))
      .ForMember(dest => dest.IsNightShift, opt => opt.MapFrom(src => src.IsNightShift))
            .ForMember(dest => dest.EngHours, opt => opt.MapFrom(src => src.EngHours))
                  .ForMember(dest => dest.Comments, opt => opt.MapFrom(src => src.Comments))
                        .ForMember(dest => dest.ExcessWorkingHrCost, opt => opt.MapFrom(src => src.ExcessWorkingHrsCost));


;




            CreateMap<ComsumptionUpdateCmd,Vehicleconsumption>()
     .ForMember(dest => dest.VehicleId, opt => opt.MapFrom(src => src.VehicleId))
    .ForMember(dest => dest.TotalFuel, opt => opt.MapFrom(src => src.TotalFuel))
    .ForMember(dest => dest.ExpectedConsumption, opt => opt.MapFrom(src => src.ExcessWorkingHrsCost)) //watch out for this one
    .ForMember(dest => dest.EmployeeId, opt => opt.MapFrom(src => src.WorkingEmployee))
    .ForMember(dest => dest.Date, opt => opt.MapFrom(src => src.Date))
    .ForMember(dest => dest.MaxSpeed, opt => opt.MapFrom(src => src.MaxSpeed))
    .ForMember(dest => dest.AvgSpeed, opt => opt.MapFrom(src => src.AvgSpeed))
    .ForMember(dest => dest.TotalDistance, opt => opt.MapFrom(src => src.TotalDistance))
    .ForMember(dest => dest.IsKmperhr, opt => opt.MapFrom(src => src.IsKmperhr))
    .ForMember(dest => dest.FuelLost, opt => opt.MapFrom(src => src.FuelLost))
    .ForMember(dest => dest.FlowMeterFuelUsed, opt => opt.MapFrom(src => src.FlowMeterFuelUsed))
    .ForMember(dest => dest.FlowMeterEffiency, opt => opt.MapFrom(src => src.FlowMeterEffiency))
     .ForMember(dest => dest.FuelEfficiency, opt => opt.MapFrom(src => src.FuelEfficiency))
    .ForMember(dest => dest.EngHours, opt => opt.MapFrom(src => src.EngHours))
    //.ForMember(dest => dest.IsModified, opt => opt.MapFrom(src => src.IsModified))

    .ForMember(dest => dest.FlowMeterEngineHrs, opt => opt.MapFrom(src => src.FlowMeterEngineHrs)).ReverseMap();




            CreateMap<Vehicleconsumption, VehicleConsumptionInfoDTO>()
    .ForMember(dest => dest.VehicleId, opt => opt.MapFrom(src => src.VehicleId))
    .ForMember(dest => dest.TotalFuel, opt => opt.MapFrom(src => src.TotalFuel))
    .ForMember(dest=> dest.HyoungNo,opt=>opt.MapFrom(src=>src.Vehicle.HyoungNo))
    //.ForMember(dest=>dest.WorkingExpectedAverage,opt=>opt.MapFrom(src=>src.Vehicle.WorkingExpectedAverage))
    .ForMember(dest => dest.VehicleType , opt => opt.MapFrom(src=>src.Vehicle.VehicleType.Abbvr))
    .ForMember(dest => dest.VehicleManufacturer, opt => opt.MapFrom(src => src.Vehicle.VehicleManufacturer.Name))
    .ForMember(dest => dest.VehicleModel, opt => opt.MapFrom(src => src.Vehicle.VehicleModel.Name))
    //.ForMember(dest=> dest.WorkingEmployeesID,opt=>opt.MapFrom(src=>src.EmployeeId))
    //ForMember(dest => dest.ExpectedAveraged, opt => opt.MapFrom(src => src.ExpectedAveraged))
    .ForMember(dest => dest.Date, opt => opt.MapFrom(src => src.Date))
    .ForMember(dest => dest.MaxSpeed, opt => opt.MapFrom(src => src.MaxSpeed))
    .ForMember(dest => dest.AvgSpeed, opt => opt.MapFrom(src => src.AvgSpeed))
    .ForMember(dest => dest.TotalDistance, opt => opt.MapFrom(src => src.TotalDistance))
    .ForMember(dest => dest.IsAverageKm, opt => opt.MapFrom(src => src.IsKmperhr))
    .ForMember(dest => dest.FuelLost, opt => opt.MapFrom(src => src.FuelLost))
    .ForMember(dest => dest.FlowMeterFuelUsed, opt => opt.MapFrom(src => src.FlowMeterFuelUsed))
    .ForMember(dest => dest.FlowMeterEffiency, opt => opt.MapFrom(src => src.FlowMeterEffiency))
    //ForMember(dest => dest.FuelEfficiency, opt => opt.MapFrom(src => src.FuelEfficiency))
    .ForMember(dest => dest.EngHours, opt => opt.MapFrom(src => src.EngHours))
    .ForMember(dest => dest.IsModified, opt => opt.MapFrom(src => src.IsModified))
    .ForMember(dest => dest.Site, opt => opt.MapFrom(src =>src.Site))
    .ForMember(dest => dest.FlowMeterEngineHrs, opt => opt.MapFrom(src => src.FlowMeterEngineHrs)).ReverseMap();
   



        }
    }
}
