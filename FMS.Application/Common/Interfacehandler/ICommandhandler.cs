using FMS.Application.Common.Interface;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace FMS.Application.Common.Interfacehandler
{
    public interface ICommandHandler<TCommand> where TCommand : ICommand
    {
        Task HandleAsync(TCommand command);
    }

}

