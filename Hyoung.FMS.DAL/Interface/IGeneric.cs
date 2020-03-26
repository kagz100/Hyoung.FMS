﻿using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;

namespace Hyoung.FMS.DAL.Interface
{
    interface IGenericRepository<TEntity> where TEntity : class
    {
        TEntity Get(int id);

        IEnumerable<TEntity> GetAll();

        IEnumerable<TEntity> Find(Expression<Func<TEntity, bool>> predicate);


        string Add(TEntity entity);

        void AddRange(IEnumerable<TEntity> entities);



        void Remove(TEntity entity);
        void RemoveRange(IEnumerable<TEntity> entities);






    }
}
