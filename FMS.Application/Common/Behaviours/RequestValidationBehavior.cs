using FluentValidation;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Emit;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace FMS.Application.Common.Behaviours
{
    public class RequestValidationBehavior<TRequest, TResponse> : IPipelineBehavior<TRequest, TResponse> where TRequest: IRequest<TResponse>
    {


        private readonly IEnumerable<IValidator<TRequest>> _validator;


        public RequestValidationBehavior(IEnumerable<IValidator<TRequest>> validators)
        {
            _validator = validators;
        }



        public Task<TResponse> Handle(TRequest request, CancellationToken cancellationToken, RequestHandlerDelegate<TResponse> next)
        {
            var context = new ValidationContext(request);


            var failures = _validator
                .Select(v => v.Validate(context))
                .SelectMany(results => results.Errors)
                .Where(f => f != null).ToList();


            if(failures.Count !=0)
            {
                throw new ValidationException(failures);
            }

            return next();
        }
    }
}
