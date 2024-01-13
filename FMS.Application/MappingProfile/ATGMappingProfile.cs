using AutoMapper;
using FMS.Application.ModelsDTOs.ATG;
using FMS.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FMS.Application.MappingProfile
{
    public class ATGMappingProfile:Profile
    {
        public ATGMappingProfile()
        {
            CreateMap<InTankDeliveryDTO,Intankdelivery>().ReverseMap();
            //CreateMap<Pumptransaction, PumpTransactionDto>().ReverseMap();
           CreateMap<AlertRecordDTO, Alertrecord>().ReverseMap();
        }
    }
}
