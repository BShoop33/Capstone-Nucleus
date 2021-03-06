﻿using Capstone_Nucleus.Models;
using System.Collections.Generic;

namespace Capstone_Nucleus.Repositories
{
    public interface IItemRepository
    {
        public void Add(Item item);

        List<Item> Get();

        public List<GetByQuantity> GetByQuantity();

        public List<GetByPrice> GetByPrice();



        public List<GetByMonth> GetByMonth();

        Item GetItemById(int id);

        public void Update(Item item);

        public void Delete(int id);
    }
}