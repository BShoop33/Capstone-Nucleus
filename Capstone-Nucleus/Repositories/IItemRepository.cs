using Capstone_Nucleus.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Capstone_Nucleus.Repositories
{
    public interface IItemRepository
    {
        List<Item> Get();
    }
}
