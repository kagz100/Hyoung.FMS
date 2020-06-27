using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using FluentValidation.Results;

namespace FMS.Application.Common.Exceptions
{
   public  class ValidationException:Exception

    {

        public IDictionary<string, string[]> Failures { get; }

        public ValidationException()
            :base("One or more Validation Failures have Occured")
        {
            Failures = new Dictionary<string, string[]>();
        }



        public ValidationException(List<ValidationFailure> failures) : this()
        {

            var propertynames = failures.Select(e => e.PropertyName).Distinct();


            foreach(var propertyName in propertynames)
            {
                var propertyfailures = failures
                    .Where(e => e.PropertyName == propertyName)
                    .Select(e => e.ErrorCode).ToArray();

                Failures.Add(propertyName, propertyfailures);
                    
            }

        }

    }
}
