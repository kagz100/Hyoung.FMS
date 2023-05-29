using FMS.Application.Common.Interface;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace FMS.Application.Common.Interfacehandler
{
    public interface IQueryHandler<TQuery, TResult> where TQuery : IQuery<TResult>
    {
        Task<TResult> Handle(TQuery query);
    }
   
    }
