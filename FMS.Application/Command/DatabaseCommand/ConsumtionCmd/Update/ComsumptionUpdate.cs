using AutoMapper;
using FMS.Persistence.DataAccess;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading;
using System.Threading.Tasks;

namespace FMS.Application.Command.DatabaseCommand.ConsumtionCmd.Update
{
    public class ComsumptionUpdateCmd : IRequest<Unit>
    {
        public int Id { get; set; }
        public int VehicleId { get; set; }
   
        public decimal? TotalFuel { get; set; }

        public int? WorkingFuelAverage { get; set; }

        public int WorkingEmployee { get; set; }

        public decimal? FuelEfficiency { get; set; }
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
        public bool? isModified { get; set; }
    }


    public class ComsumptionUpdatebyKeyHandler : IRequestHandler<ComsumptionUpdateCmd,Unit>
    {


        private readonly GpsdataContext _gpsdataContext;
        private readonly IMapper _mapper;


        public ComsumptionUpdatebyKeyHandler(GpsdataContext gpsdataContext, IMapper mapper)
        {
            _gpsdataContext = gpsdataContext;
            _mapper = mapper;
        }


        public async  Task<Unit> Handle(ComsumptionUpdateCmd request, CancellationToken cancellationToken)
        {
            var comsumption = await _gpsdataContext.Vehicleconsumptions.FindAsync(request.Id);

            if(comsumption == null)
            {
                throw new Exception("Could not find the comsumption");
            }

            //map the request to the entity
            _mapper.Map(request, comsumption);

            //update the entity 
            await _gpsdataContext.SaveChangesAsync(cancellationToken);

            return Unit.Value;
 
      }

       
    }
}
