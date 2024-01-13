using  System;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using FMS.Application.Common;
using FMS.Application.ModelsDTOs.ATG;
using FMS.Application.ModelsDTOs.ATG.Common;
using FMS.Domain.Entities;
using FMS.Persistence.DataAccess;
using MediatR;

namespace FMS.Application.Command.DatabaseCommand.ATGCommands.AlertRecordCommand
{

    public class CreateAlertRecordCommand : IRequest<string>
    {
        public PtsRequestDto PtsRequestDto { get; set; }

    }

    public class CreateAlertRecordCommandHandler : IRequestHandler<CreateAlertRecordCommand, string>
    {

        private readonly GpsdataContext _context;
        private readonly IMapper _mapper;


        public CreateAlertRecordCommandHandler( GpsdataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        

        /// <summary>
        /// Handles the creation of an alert record.
        /// </summary>
        /// <param name="request">The command request.</param>
        /// <param name="cancellationToken">The cancellation token.</param>
        /// <returns>A task representing the asynchronous operation. The task result contains a string representing the result of the operation.</returns>
        public  async Task <string> Handle(CreateAlertRecordCommand request, CancellationToken cancellationToken)
        {
           int requetsid = 0;
            try
            {
                foreach(var packet in request.PtsRequestDto.Packets)
                {
                    foreach(var dataobject in packet.Data)
                    {
                        var alertrecorddata = dataobject.ToObject<AlertRecordDTO>();
                        if (alertrecorddata == null) continue;

                        var alertrecord = _mapper.Map<Alertrecord>(alertrecorddata);
                        alertrecord.PacketId = packet.Id;
                        alertrecord.Ptsid = request.PtsRequestDto.PtsId;

                        _context.Alertrecords.Add(alertrecord);
                        requetsid = alertrecord.AlertId;
                    }
                }
                await _context.SaveChangesAsync(cancellationToken);
                return  ConfirmationMessage.Success(requetsid, "UploadAlertRecord");
            }
            catch (Exception ex)
            {
                return ConfirmationMessage.Error(requetsid, "UploadAlertRecord",500, ex.Message);
            }

        }
    }
    
}