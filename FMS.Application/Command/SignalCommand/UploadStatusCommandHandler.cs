using FMS.Application.ModelsDTOs.ATG.Common;
using FMS.Domain.ATGStatus;
using FMS.Services.Helper;
using MediatR;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace FMS.Application.Command.SignalCommand
{

    public class UploadStatusCommand : IRequest<UploadStatus>
    {
        public JToken Data { get; set; }   
    }

    public class UploadStatusCommandHandler : IRequestHandler<UploadStatusCommand,UploadStatus>
    {
      public async Task<UploadStatus> Handle(UploadStatusCommand request, CancellationToken cancellationToken)
        {
            var atgStatusService = new ATGStatusService();
            return  atgStatusService.DeserializeUploadStatus(request.Data.ToString());
        }
    }
}
