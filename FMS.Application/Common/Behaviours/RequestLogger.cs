using FMS.Application.Common.Interfaces;
using MediatR.Pipeline;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace FMS.Application.Common.Behaviours
{
    public class RequestLogger<TRequest> : IRequestPreProcessor<TRequest>
    {

        private readonly ILogger _logger;
        private readonly ICurrentUserService _currentUserService;


        public RequestLogger(ILogger<TRequest> logger ,ICurrentUserService currentUserService)
            {

            _logger = logger;

            _currentUserService = currentUserService;
            }



        public Task Process(TRequest request, CancellationToken cancellationToken)
        {
            var name = typeof(TRequest).Name;


            _logger.LogInformation("FMS request: {Name} {@UserId} {@Request ", name, _currentUserService, request);


            return Task.CompletedTask;


        }
    }
}
