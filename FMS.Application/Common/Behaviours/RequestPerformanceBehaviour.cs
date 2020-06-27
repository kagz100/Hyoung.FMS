using FMS.Application.Common.Interfaces;
using MediatR;
using MediatR.Pipeline;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace FMS.Application.Common.Behaviours
{
    public class RequestPerformanceBehaviour<TRequest, TResponce> : IPipelineBehavior<TRequest, TResponce>
    {
        private readonly Stopwatch _timer;

        private readonly ILogger<TRequest> _logger;

        private readonly ICurrentUserService _currentUserService;


        public RequestPerformanceBehaviour (ILogger<TRequest> logger , ICurrentUserService currentUserService)
        {
            _timer = new Stopwatch();

            _logger = logger;

            _currentUserService = currentUserService;

        }



        public async Task<TResponce> Handle(TRequest request, CancellationToken cancellationToken, RequestHandlerDelegate<TResponce> next)
        {

            _timer.Start();


            var responce = await next();


                _timer.Stop();



            if(_timer.ElapsedMilliseconds>500 )
            {
                var name = typeof(TRequest).Name;


                _logger.LogWarning("FMS login running request : {Name} , ({ElapsedMillisecond} milliseconds) {@UserId} {@Request}",
                    name, _timer.ElapsedMilliseconds, _currentUserService.UserID, request);
            }


            return responce;





        }
    }
}
