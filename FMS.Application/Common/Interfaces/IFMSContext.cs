using FMS.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace FMS.Application.Common.Interfaces
{
   public  interface IFMSContext
    {
      DbSet<Vehicle> Vehicles { get; set; }

    }
}
