using Capstone_Nucleus.Data;
using Capstone_Nucleus.Models;
using Microsoft.EntityFrameworkCore;
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