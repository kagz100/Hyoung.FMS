using Xunit;
using Moq;
using System.Threading;
using System.Collections.Generic;
using FMS.Domain.Entities;
using FMS.Persistence;
using FMS.Infrastructure.Webservice;
using FMS.Infrastructure.DependancyInjection;
using FMS.Application.Queries;
using System.Linq;
using System.Threading.Tasks;
//using FMS.Application.Queries.GetconsumptionReport;
using FMS.Domain.Entities.Auth;
using FMS.Persistence.DataAccess;
using Microsoft.EntityFrameworkCore;
using FMS.Application.Models;

namespace FMS.Testing.ConsumptionQueriesTest
{
    //public class GetConsumptionReportQueriesMock
    //{
    //    private GPSGateConections _gpsGateConections;


    //    [Fact]
    //    public async Task Handle_ReturnsCorrectConsumptionReport()
    //    {

    //        //arrange 
    //        var cancellationToken = new CancellationToken();

    //        _gpsGateConections = new GPSGateConections();
    //        _gpsGateConections.SessionID = "FC93F2F891692CFD13FBC4CB7059FBA9";


    //        var from = new DateTime(2023, 3, 27, 0, 0, 0, DateTimeKind.Local);
    //        var to = new DateTime(2023, 3, 28, 0, 0, 0, DateTimeKind.Local);


    //        var request = new GetConsumptionReportQuery(_gpsGateConections, 218, from, to);





    //        // mock the gpsgate directory web service 


    //        var mockGPSGateDirectory = new Mock<IGPSGateDirectoryWebservice>();

    //        mockGPSGateDirectory.Setup(ws => ws.GetFuelConsumptionReportAsync(request.conn, request.FuelConsumptionReportId, request.From, request.To)).ReturnsAsync(GetTestConsumptionReport());




    //        //mock the context and the vehicles dbset 
    //        var mockcontext = new Mock<GpsdataContext>();
    //       // var testvehicles = GetTestVehicles().AsQueryable();

    //     //   mockcontext.Setup(c => c.Vehicles).Returns(testvehicles);


    //        var handler = new GetConsumptionReportQueryHandler(mockGPSGateDirectory.Object, mockcontext.Object);

    //        //act
    //        var result = await handler.Handle(request, cancellationToken);

    //        //assert

    //        Assert.Equal(2, result.Count());
    //        Assert.NotNull(result);


    //        var consumptionInfo1 = result.First(x => x.VehicleId == 1);
    //        Assert.NotNull(consumptionInfo1);
    //        Assert.Equal("ADT02", consumptionInfo1.HyoungNo);

    //        var consumptionInfo2 = result.First(x => x.VehicleId == 1);
    //        Assert.NotNull(consumptionInfo1);
    //        Assert.Equal("Tp01", consumptionInfo1.HyoungNo);




    //    }




    //    [Fact]
    //    //use in memorydatabase
    //    public async Task Handle_UsingInMemoryDatabase_ReturnsCorrectConsumptionReport()
    //    {
    //        //arrange
    //        var options = new DbContextOptionsBuilder<GpsdataContext>()
    //            .UseInMemoryDatabase(databaseName: "gpsdata")
    //            .Options;


    //        //seed the in-memony database wiht test data
    //        using (var context = new GpsdataContext(options))
    //        {
    //            context.Vehicles.AddRange(GetTestVehicles());
    //            await context.SaveChangesAsync();
    //        }


    //        //set up the gpsConnectin dates and request

    //        var cancellationToken = new CancellationToken();
    //        var gpsGateConections = new GPSGateConections{ SessionID = "5622F3478AC028A60F6F802A4A90BEA0" };

    //        var from = new DateTime(2023, 3, 27, 0, 0, 0, DateTimeKind.Local);
    //        var to = new DateTime(2023, 3, 28, 0, 0, 0, DateTimeKind.Local);

    //        var request = new GetConsumptionReportQuery(gpsGateConections, 218, from, to);



    //        // Mock the GPSGate directory web service
    //        var mockGPSGateDirectory = new Mock<IGPSGateDirectoryWebservice>();
    //        mockGPSGateDirectory.Setup(ws => ws.GetFuelConsumptionReportAsync(request.conn, request.FuelConsumptionReportId, request.From, request.To)).ReturnsAsync(GetTestConsumptionReport());


    //        //act 
    //        List<VehicleConsumptionInfo> result;

    //        using (var context = new GpsdataContext(options))
    //        {
    //            var handler = new GetConsumptionReportQueryHandler(mockGPSGateDirectory.Object, context);
    //            result = await handler.Handle(request, cancellationToken);
    //        }


    //        //assert 
    //        Assert.Equal(2, result.Count());
    //        Assert.NotNull(result);

    //        var consumptionInfo1 = result.First(x => x.VehicleId == 1);
    //        Assert.NotNull(consumptionInfo1);
    //        Assert.Equal("ADT02", consumptionInfo1.HyoungNo);

    //        var consumptionInfo2 = result.First(x => x.VehicleId == 1);
    //        Assert.NotNull(consumptionInfo1);
    //        Assert.Equal("Tp01", consumptionInfo1.HyoungNo);


    //    }





    //    //private List<Vehicle> GetTestVehicles()
    //    //{
    //    //    return new List<Vehicle>
    //    //   {
    //    //       new Vehicle
    //    //       {
    //    //           VehicleId = 1,
    //    //             HyoungNo = "ADT02",

    //    //             FuelConsumptionType =  FuelConsumptionType.LitersPerHour,

    //    //             VehicleType = new Vehicletype
    //    //             {
    //    //                  Name = "Dumper"
    //    //             },
    //    //             VehicleModel = new Vehiclemodel
    //    //             {
    //    //                  Name = "Toyota"
    //    //             },
    //    //             ExpectedAveraged = 10,
    //    //             WorkingSite = new Site
    //    //             {
    //    //                  Name = "Site 1"
    //    //             },
    //    //             ExcessWorkingHrCost = 10,
    //    //             DefaultEmployee = new Employee
    //    //             {
    //    //                  FullName = "John Doe",
    //    //                  EmployeeWorkNo = "1234"
    //    //             }
    //    //           },

    //    //       new Vehicle
    //    //       {
    //    //           VehicleId = 2,
    //    //             HyoungNo = "Tp01",

    //    //             FuelConsumptionType =  FuelConsumptionType.KilometersPerLiter,

    //    //             VehicleType = new Vehicletype
    //    //             {
    //    //                  Name = "Tipper"
    //    //             },
    //    //             VehicleModel = new Vehiclemodel
    //    //             {
    //    //                  Name = "Tipper"
    //    //             },
    //    //             ExpectedAveraged = 2,
    //    //             WorkingSite = new Site
    //    //             {
    //    //                  Name = "Site 2"
    //    //             },
    //    //             ExcessWorkingHrCost = 10,
    //    //             DefaultEmployee = new Employee
    //    //             {
    //    //                  FullName = "John Doe",
    //    //                  EmployeeWorkNo = "1234"
    //    //             }
    //    //       }


    //    //       };
    //    //}


    //    private List<Vehicleconsumption> GetTestConsumptionReport()
    //    {
    //        return new List<Vehicleconsumption>
    //        {
    //            //add test data for vehicle consumption 

    //            new Vehicleconsumption
    //            {
    //                    VehicleId = 1205,
    //                    TotalFuel = 100,
    //                    Date = new DateTime(2023, 3, 27, 0, 0, 0, DateTimeKind.Local),
    //                    EngHours = 2
    //            },

    //            new Vehicleconsumption
    //            {
    //                    VehicleId = 1206,
    //                    TotalFuel = 200,
    //                    Date = new DateTime(2023, 3, 27, 0, 0, 0, DateTimeKind.Local),
    //                    MaxSpeed = 100,
    //                    AvgSpeed = 100,
    //                    TotalDistance = 100,
    //             }
    //           };
    //    }

    //}
}

