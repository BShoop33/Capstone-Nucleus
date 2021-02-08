﻿using Capstone_Nucleus.Data;
using Capstone_Nucleus.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Capstone_Nucleus.Repositories
{
    public class ItemRepository : IItemRepository
    {
        private ApplicationDbContext _context;

        public ItemRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<Item> Get()
        {
            return _context.Item
                .Where(i => i.IsActive)
                .Include(i => i.Department)
                .OrderBy(i => i.Department.Name)
                .ToList();
        }

        //public List<GetByCount> GetByCount()
        //{
        //    return _context.Item
        //        .Where(g => g.IsActive)
        //        .GroupBy(i => new { i.DepartmentId, i.DateReceived.Month })
        //        .OrderBy(i => i.Key.DepartmentId)
        //        .Select(i => new GetByCount { DepartmentId = i.Key.DepartmentId, DateReceived = i.Key.Month, TotalQuantity = i.Sum(g => g.Quantity), TotalPrice = i.Sum(g => g.UnitPrice * g.Quantity)})
        //        .ToList();
        //}

        public List<GetByCount> GetByCount()
        {
            var todaysDate = new DateTime(DateTime.Today.Year, DateTime.Today.Month, DateTime.Today.Day);
            var duration = todaysDate.AddMonths(-12);
            return _context.Item
                .Where(g => g.IsActive)
                .Where(f => f.DateReceived >= duration)
                .GroupBy(i => new { i.DepartmentId })
                .OrderBy(i => i.Key.DepartmentId)
                .Select(i => new GetByCount { DepartmentId = i.Key.DepartmentId, TotalQuantity = i.Sum(g => g.Quantity), TotalPrice = i.Sum(g => g.UnitPrice * g.Quantity) })
                .ToList();
        }

        public List<GetByMonth> GetByMonth()
        {
            var todaysDate = new DateTime(DateTime.Today.Year, DateTime.Today.Month, DateTime.Today.Day);
            var duration = todaysDate.AddMonths(-12);
            return _context.Item
                .Where(g => g.IsActive)
                .Where(f => f.DateReceived >= duration)
                .GroupBy(i => new { i.DateReceived.Month })
                .OrderBy(i => i.Key.Month)
                .Select(i => new GetByMonth { DateReceived = i.Key.Month, MonthlyTotalQuantity = i.Sum(g => g.Quantity), MonthlyTotalPrice = i.Sum(g => g.UnitPrice * g.Quantity) })
                .ToList();
        }







        public void Add(Item item)
        {
            _context.Add(item);
            _context.SaveChanges();
        }
        
        public Item GetItemById(int id)
        {
            return _context.Item
                .Include(i => i.Department)
                .FirstOrDefault(i => i.Id == id);
        }

        public void Update(Item item)
        {
            item.IsActive = true;
            _context.Entry(item).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var deletingItem = GetItemById(id);
            deletingItem.IsActive = false;
            _context.Entry(deletingItem).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            _context.SaveChanges();
        }
    }
}