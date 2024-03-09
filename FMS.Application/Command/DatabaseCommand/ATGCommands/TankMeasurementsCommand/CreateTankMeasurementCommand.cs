using AutoMapper;
using AutoMapper.Configuration.Annotations;
using FMS.Application.Command.DatabaseCommand.ExpectedAVGCmd;
using FMS.Application.Common;
using FMS.Application.ModelsDTOs.ATG;
using FMS.Application.ModelsDTOs.ATG.Common;
using FMS.Domain.Entities;
using FMS.Persistence.DataAccess;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Org.BouncyCastle.Asn1.Ocsp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace FMS.Application.Command.DatabaseCommand.ATGCommands.TankMeasurementsCommand
{
    public class CreateTankMeasurementCommand : IRequest<string>    
    {

        public PtsRequestDto PtsRequestDto { get; set; }
     
        
    }


    public class CreateTankMeasurementCommandHandler : IRequestHandler<CreateTankMeasurementCommand, string>
    {


        private readonly GpsdataContext _context;
        private readonly IMapper _mapper;

        public CreateTankMeasurementCommandHandler(GpsdataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<string> Handle(CreateTankMeasurementCommand request, CancellationToken cancellationToken)
        {
            var requestid =0;

            var tankMeasurements = new List<Tankmeasurement>();
            var allAlarmNames = request.PtsRequestDto.Packets
                               .SelectMany(p => p.Data.ToObject<TankMeasurementDto>()?.Alarms ?? new List<string>())
                               .Distinct();

            var alarms = await _context.Alarms
                              .Where(a => allAlarmNames.Contains(a.Name))
                              .ToListAsync(cancellationToken);


            using (var transaction = _context.Database.BeginTransaction())
            {
                try
                {


                    foreach (var packet in request.PtsRequestDto.Packets)
                    {
                        //deserialize the Json object to TankmeasurementDto
                        var tankdata = packet.Data.ToObject<TankMeasurementDto>();

                        if (tankdata == null) continue;

                        var tankmeasurementsdata = new Tankmeasurement
                        {
                            PacketId = packet.Id,
                            Tank = tankdata.Tank,
                            ProductUllage = tankdata.ProductUllage,
                            Ptsid = request.PtsRequestDto.PtsId,
                            DateTime = tankdata.DateTime,
                            FuelGradeId = tankdata.FuelGradeId,
                            ProductHeight = tankdata.ProductHeight,
                            WaterHeight = tankdata.WaterHeight,
                            Temperature = tankdata.Temperature,
                            ProductVolume = tankdata.ProductVolume,
                            WaterVolume = tankdata.WaterVolume,
                            ProductTcvolume = tankdata.ProductTcvolume,
                            ProductDensity = tankdata.ProductDensity,
                            ProductMass = tankdata.ProductMass,
                            TankFillingPercentage = tankdata.TankFillingPercentage,
                            ConfigurationId = tankdata.ConfigurationId,
                            Status = tankdata.Status,
                            Alarms = alarms.Where(a => tankdata.Alarms.Contains(a.Name)).ToList()
                        
                        };

                        tankMeasurements.Add(tankmeasurementsdata);
                        requestid = tankmeasurementsdata.PacketId;


                    }
                    _context.Tankmeasurements.AddRange(tankMeasurements);

                   

                    // _context.Tankmeasurements.Add(tankmeasurementsdata);
                    await _context.SaveChangesAsync(cancellationToken);
                    transaction.Commit();
                    return ConfirmationMessage.Success(requestid, "UploadTankMeasurement");

                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                    return ConfirmationMessage.Error(requestid, "UploadTankMeasurement", 500, ex.Message);
                }


            }
        }
    }

}
