using Capstone_Nucleus.Data;
using Capstone_Nucleus.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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
                .ToList();
        }
    }
}