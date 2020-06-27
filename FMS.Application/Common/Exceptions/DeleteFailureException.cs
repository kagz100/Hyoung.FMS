using System;
using System.Collections.Generic;
using System.Text;

namespace FMS.Application.Common.Exceptions
{
    public class DeleteFailureException : Exception
    {
        public DeleteFailureException(string name, object key, string message)
            : base($"Delection of Entity \"{name}\"({key}) failed. {message}")
        {

        }

    }
}
