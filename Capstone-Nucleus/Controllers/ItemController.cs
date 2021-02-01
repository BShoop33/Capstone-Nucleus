using Capstone_Nucleus.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace Capstone_Nucleus.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItemController : ControllerBase
    {
        private readonly IItemRepository _itemRepo;

        public ItemController(IItemRepository itemRepo)
        {
            _itemRepo = itemRepo;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var items = _itemRepo.Get();
            return Ok(items);
        }

    }
}