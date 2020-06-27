using FMS.Application.Common.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace FMS.Application.Common.Interfaces
{
    public interface IUserManager
    {

        Task<(Result Result, string UserID)> CreateUserAsync(string userName, string password);


        Task<Result> DeleteUserAsync(string userId);
    }
}
