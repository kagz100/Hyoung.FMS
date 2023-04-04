using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace FMS.Application.Common.Interfacehandler
{
    public interface ICommandhandler<TCommand> where TCommand : ICommand
    {
        Task HandleAsync(TCommand command);
    }
}
  
