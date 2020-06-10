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
    public class HeavyEquipmentReportDB : IGenericRepository<Heayvconsumption>
    {
        private readonly HyoungGPSContext _context = new HyoungGPSContext();

        public string Add(Heayvconsumption entity)
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

        public void AddRange(IEnumerable<Heayvconsumption> entities)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Heayvconsumption> Find(Expression<Func<Heayvconsumption, bool>> predicate)
        {
            throw new NotImplementedException();
        }

        public Heayvconsumption Get(int id)
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
        public List<Heayvconsumption> GetReport(DateTime startDate , DateTime endDate)
        {

                var resutlts = _context.Heayvconsumption
                            .Where(a => a.Date >= startDate && a.Date <= endDate);

            return resutlts.ToList();
    
        }
        /// <summary>
        /// Get report from GPSGate server
        /// </summary>
        /// <param name="startDate"></param>
        /// <param name="endDate"></param>
        /// <param name="reportID"></param>
        /// <returns></returns>
       // public HeavyEquipmentReportDB GetGPSgateData(DateTime startDate, DateTime endDate,int reportID,XmlNode node)
        //{

          //  XMLSoapSerializer sr = new XMLSoapSerializer();
            //HeavyEquipmentReportDB db = sr.Deserializer<HeavyEquipmentReportDB>(node.ToString());

            //return db;
        ///}


        public IEnumerable<Heayvconsumption> GetAll()
        {
            throw new NotImplementedException();
        }

        public void Remove(Heayvconsumption entity)
        {
            throw new NotImplementedException();
        }

        public void RemoveRange(IEnumerable<Heayvconsumption> entities)
        {
            throw new NotImplementedException();
        }
    }
}
