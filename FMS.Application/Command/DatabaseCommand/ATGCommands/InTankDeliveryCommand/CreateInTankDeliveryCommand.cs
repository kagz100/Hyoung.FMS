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
using System.Reflection.Metadata.Ecma335;
using System.Text;
using System.Threading;
using System.Threading.Tasks;


namespace FMS.Application.Command.DatabaseCommand.ATGCommands.InTankDeliveryCommand
{
    public class CreateInTankDeliveryCommand : IRequest<string>
    {
        public PtsRequestDto PtsRequestDto { get; set; }

    }

    public class InTankDeliveryCommandHandler : IRequestHandler<CreateInTankDeliveryCommand, string>
    {
        public readonly GpsdataContext _context;
        public readonly IMapper _mapper;

        public InTankDeliveryCommandHandler(GpsdataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<string> Handle(CreateInTankDeliveryCommand request, CancellationToken cancellationToken)
        {
            int requestid = 0;

            try
            {
                foreach(var packet in request.PtsRequestDto.Packets)
                {
                    foreach(var dataobject in packet.Data)
                    {
                        var intankdeliverydata = dataobject.ToObject<InTankDeliveryDTO>();
                        if (intankdeliverydata == null) continue;

                        
                           var intankdelivery = _mapper.Map<Intankdelivery>(intankdeliverydata) ;
                           intankdelivery.PacketId = packet.Id;
                           intankdelivery.Ptsid = request.PtsRequestDto.PtsId;

                            _context.Intankdeliveries.Add(intankdelivery);
                            requestid = intankdelivery.DeliveryId;


                    }
                      
                    await _context.SaveChangesAsync(cancellationToken);


                }
           return ConfirmationMessage.Success(requestid, "InTankDelivery");


            }
            catch (Exception ex)
            {
                return ConfirmationMessage.Error(requestid, "InTankDelivery",500, ex.Message);

            }
            }
        }
    }





