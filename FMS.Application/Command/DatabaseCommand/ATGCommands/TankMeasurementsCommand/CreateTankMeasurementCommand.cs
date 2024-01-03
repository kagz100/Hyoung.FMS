using AutoMapper;
using AutoMapper.Configuration.Annotations;
using FMS.Application.Command.DatabaseCommand.ExpectedAVGCmd;
using FMS.Application.Common;
using FMS.Application.ModelsDTOs.ATG;
using FMS.Application.ModelsDTOs.ATG.Common;
using FMS.Domain.Entities;
using FMS.Persistence.DataAccess;
using MediatR;
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
           try
            {


                foreach (var packet in request.PtsRequestDto.Packets)
                {


                    foreach (var dataobject in packet.Data)
                    {

                        //deserialize the Json object to TankmeasurementDto
                        var tankdata = dataobject.ToObject<TankMeasurementDto>();
                        if (tankdata == null) continue;

                        var tankmeasurementsdata = new Tankmeasurement
                        {
                            PacketId = packet.Id,
                            Tank = tankdata.Tank,
                            ProductUllage = tankdata.ProductUllage,
                            PTSId = request.PtsRequestDto.PtsId,
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
                            Status = tankdata.Status


                        };

                        _context.Tankmeasurements.Add(tankmeasurementsdata);


                        //process alamrs and add to tankmeasurementsdata
                        foreach (var alarmName in tankdata.Alarms)
                        {
                            var alarm = _context.Alarms.FirstOrDefault(x => x.Name == alarmName);
                            if (alarm != null)
                            {

                                tankmeasurementsdata.AlarmTankmeasurements.Add(new AlarmTankmeasurement
                                {
                                    AlarmId = alarm.Id,
                                    TankMeausement = tankmeasurementsdata
                                });

                            }
                        }


                        requestid = tankmeasurementsdata.PacketId;

                    }
                }

                // _context.Tankmeasurements.Add(tankmeasurementsdata);
                await _context.SaveChangesAsync(cancellationToken);
              
                return ConfirmationMessage.CreateConfirmationMessage(requestid, "UploadTankMeasurement");

            } catch (Exception ex)
            {
                
                return ConfirmationMessage.CreateErrorMessage(requestid, "UploadTankMeasurement", 500, ex.Message);
            }

           

        }
    }

}
