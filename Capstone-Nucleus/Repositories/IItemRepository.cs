using Capstone_Nucleus.Models;
using System.Collections.Generic;

namespace Capstone_Nucleus.Repositories
{
    public interface IItemRepository
    {
        List<Item> Get();

        Item GetItemById(int id);

        public void Add(Item item);

        public void Update(Item item);

        public void Delete(int id);

        public List<GetByCount> GetByCount();

        public List<GetByMonth> GetByMonth();
    }
}