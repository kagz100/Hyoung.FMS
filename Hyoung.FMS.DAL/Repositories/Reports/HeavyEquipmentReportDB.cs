using Hyoung.FMS.DAL.Interface;
using Hyoung.FMS.Model.DataAccess;
using Hyoung.FMS.Model.Models;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Xml.Linq;
using System.Xml;

namespace Hyoung.FMS.DAL.Repositories.Reports
{
    public class HeavyEquipmentReportDBRepository : IGenericRepository<Heavyconsumption>
    {
        private readonly HyoungGPSContext _context = new HyoungGPSContext();

        public string Add(Heavyconsumption entity)
        {
            try
            {
                _context.Add(entity);
                _context.SaveChanges();
                return "success";
            }catch (Exception e )
            {
                return e.Message.ToString();
            }
        }

        public void AddRange(IEnumerable<Heavyconsumption> entities)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Heavyconsumption> Find(Expression<Func<Heavyconsumption, bool>> predicate)
        {
            throw new NotImplementedException();
        }

        public Heavyconsumption Get(int id)
        {
            var resutls = _context.Heayvconsumption.Find(id);

            return resutls;
        }

        /// <summary>
        /// Return a list for Heavy Consumption Data 
        /// </summary>
        /// <param name="startDate">The data that starts</param>
        /// <param name="endDate">The date that ends</param>
        /// <returns></returns>
        public List<Heavyconsumption> GetReport(DateTime startDate , DateTime endDate)
        {

                var resutlts = _context.Heayvconsumption
                            .Where(a => a.Date >= startDate && a.Date <= endDate);

            return resutlts.ToList();
    
        }
  
        public IEnumerable<Heavyconsumption> GetAll()
        {
            throw new NotImplementedException();
        }

        public void Remove(Heavyconsumption entity)
        {
            throw new NotImplementedException();
        }

        public void RemoveRange(IEnumerable<Heavyconsumption> entities)
        {
            throw new NotImplementedException();
        }
    }
}
