using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace FMS.Application.Common.Models
{
   public class Result
    {
        internal  Result(bool succeded , IEnumerable<string> error )
        {
            Succeeded = succeded;
            Errors = error.ToArray();
        }



        public bool Succeeded { get; set; }
        public string [] Errors { get; set; }


        public static Result Success()
        {
            return new Result(true, new string[] { });
        }


        public static Result Failure (IEnumerable<string> errors )
        {
            return new Result(false, errors);
        }

    }
}
