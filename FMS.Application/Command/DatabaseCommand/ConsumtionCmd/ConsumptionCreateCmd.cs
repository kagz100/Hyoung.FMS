using System;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using FMS.Domain.Entities;
using FMS.Persistence.DataAccess;
using MediatR;

namespace FMS.Application.Command.DatabaseCommand.ConsumptionCmd;

public class ConsumptionCreateCmd : IRequest<Unit>

{

    public int VehicleId { get; set; }

    public decimal? TotalFuel { get; set; }

    public int? WorkingFuelAverage { get; set; }

    public int WorkingEmployee { get; set; }

    public DateTime Date { get; set; }


    public decimal? MaxSpeed { get; set; }

    public decimal? AvgSpeed { get; set; }


    public decimal? FuelLost { get; set; }

    public bool IsKmperhr { get; set; }
    public bool IsNightShift { get; set; }

    public int SiteID { get; set; }

    public decimal? TotalDistance { get; set; }

    public decimal? FlowMeterFuelUsed { get; set; }

    public decimal? FlowMeterFuelLost { get; set; }

    public decimal? FlowMeterEffiency { get; set; }

    public decimal? EngHours { get; set; }

    public decimal? FlowMeterEngineHrs { get; set; }

    public decimal? ExcessWorkingHrsCost { get; set; }


}


public class ConsumptionCmdCreateHandler : IRequestHandler<ConsumptionCreateCmd, Unit>

{

    private readonly GpsdataContext _context;
    private readonly IMapper _mapper;


    public ConsumptionCmdCreateHandler(GpsdataContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;

    }



    public async Task<Unit> Handle(ConsumptionCreateCmd request, CancellationToken cancellationToken)
    {
        var vehicleConsumption = new Vehicleconsumption
        {
            VehicleId = request.VehicleId,
            TotalFuel = request.TotalFuel,
            ExpectedConsumption = request.WorkingFuelAverage,
            EmployeeId = request.WorkingEmployee,
            Date = request.Date,
            MaxSpeed = request.MaxSpeed,
            AvgSpeed = request.AvgSpeed,
            FuelLost = request.FuelLost,
            IsKmperhr = request.IsKmperhr ? 1UL : 0UL,
            IsNightShift = request.IsNightShift ? 1UL : 0UL,
            SiteId = request.SiteID,
            TotalDistance = request.TotalDistance,
            FlowMeterFuelUsed = request.FlowMeterFuelUsed,
            FlowMeterFuelLost = request.FlowMeterFuelLost,
            FlowMeterEffiency = request.FlowMeterEffiency,
            EngHours = request.EngHours,
            FlowMeterEngineHrs = request.FlowMeterEngineHrs,
            ExcessWorkingHrsCost = request.ExcessWorkingHrsCost
        };

        _context.Vehicleconsumptions.Add(vehicleConsumption);
        await _context.SaveChangesAsync(cancellationToken);

        return Unit.Value;

    }
}