using Capstone_Nucleus.Models;
using Capstone_Nucleus.Repositories;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Security.Claims;

namespace Capstone_Nucleus.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItemController : ControllerBase
    {
        private readonly IItemRepository _itemRepo;
        private readonly IUserProfileRepository _userRepo;

        public ItemController(IItemRepository itemRepo, IUserProfileRepository userRepo)
        {
            _itemRepo = itemRepo;
            _userRepo = userRepo;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var items = _itemRepo.Get();
            return Ok(items);
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userRepo.GetByFirebaseUserId(firebaseUserId);
        }

        [HttpPost("additem")]
        public IActionResult Add(Item item)
        {
            var user = GetCurrentUserProfile();
            item.UserProfileId = user.Id;
            item.DateReceived = DateTime.Now;
            item.IsActive = true;
            //item.ItemPicture = "";
            _itemRepo.Add(item);
            return Ok(item);
        }

        [HttpDelete("deleteitem/{id}")]
        public IActionResult Delete(int id)
        {
            _itemRepo.Delete(id);
            return NoContent();
        }
    }
}