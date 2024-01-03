using AutoMapper;
using FMS.Application.Common;
using FMS.Application.ModelsDTOs.ATG;
using FMS.Application.ModelsDTOs.ATG.Common;
using FMS.Domain.Entities;
using FMS.Persistence.DataAccess;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace FMS.Application.Command.DatabaseCommand.ATGCommands.PumpTransactoinCommand
{
    public class CreatePumpTransactionCommand : IRequest<string>
    {
        public PtsRequestDto  PtsRequestDto { get; set; }
    }

    public class CreatePumpTransactionCommandHandler : IRequestHandler<CreatePumpTransactionCommand, string>
    {
        private readonly GpsdataContext _context;
        private readonly IMapper _mapper;

        public CreatePumpTransactionCommandHandler(GpsdataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public  async Task<string> Handle(CreatePumpTransactionCommand request, CancellationToken cancellationToken)
        {
            int requestid = 0;  

            try
            {
                foreach(var packet in request.PtsRequestDto.Packets)
                {
                    foreach(var dataobject in packet.Data)
                    {
                        var pumpdata = dataobject.ToObject<PumpTransactionDto>();
                        if (pumpdata == null) continue;

                        var pumptransactiondata = new PumpTransaction
                        {
                            PacketId = packet.Id,
                            PtsId = request.PtsRequestDto.PtsId,
                            DateTime = pumpdata.DateTime,
                            DateTimeStart = pumpdata.DateTimeStart,
                            FuelGradeId = pumpdata.FuelGradeId,
                            FuelGradeName = pumpdata.FuelGradeName,
                            Nozzle = pumpdata.Nozzle,
                            Price = pumpdata.Price,
                            Pump = pumpdata.Pump,
                            Tag = pumpdata.Tag,
                            TCVolume = pumpdata.TCVolume,
                            TotalAmount = pumpdata.TotalAmount,
                            TotalVolume = pumpdata.TotalVolume,
                            Transaction = pumpdata.Transaction,
                            UserId = pumpdata.UserId,
                            Volume = pumpdata.Volume,
                            ConfigurationId = pumpdata.ConfigurationId
                        };

                        _context.Pumptransactions.Add(pumptransactiondata);  //Todo: Add PumpTransaction to database
                        await _context.SaveChangesAsync(cancellationToken);

                        requestid = pumptransactiondata.Id;

                        return ConfirmationMessage.CreateConfirmationMessage(requestid, "UploadPumpTransaction");

                    }
                }
            }

            catch (Exception ex)
            {
                return ConfirmationMessage.CreateErrorMessage(requestid, "UploadPumpTransaction", 500, ex.Message);

            }
        }

    }

}
