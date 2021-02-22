using Capstone_Nucleus.Models;
using Capstone_Nucleus.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Security.Claims;

namespace Capstone_Nucleus.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserProfileController : ControllerBase
    {
        private readonly IUserProfileRepository _userProfileRepo;
        public UserProfileController(IUserProfileRepository userProfileRepo)
        {
            _userProfileRepo = userProfileRepo;
        }

        [HttpPost]
        public IActionResult Add(UserProfile userProfile)
        {
            userProfile.DateRegistered = DateTime.Now;
            userProfile.IsActive = true;
            _userProfileRepo.Add(userProfile);
            return CreatedAtAction(
                nameof(GetUserProfile),
                new { firebaseUserId = userProfile.FirebaseUserId },
                userProfile);
        }

        [HttpGet("editprofile/{id}")]
        public IActionResult Get(int id)
        {
            var currentUser = _userProfileRepo.GetById(id);

            var user = GetCurrentUserProfile();
            if (user.Id != id)
            {
                return NotFound();
            }
            return Ok(currentUser);
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepo.GetByFirebaseUserId(firebaseUserId);
        }

        [HttpGet("{firebaseUserId}")]
        public IActionResult GetUserProfile(string firebaseUserId)
        {
            return Ok(_userProfileRepo.GetByFirebaseUserId(firebaseUserId));
        }

        [HttpPut("editprofile/{id}")]
        public IActionResult Put(UserProfile userProfile)
        {
            var user = GetCurrentUserProfile();
            if (user.Id == userProfile.Id)
            {
                user.FirstName = userProfile.FirstName;
                user.LastName = userProfile.LastName;
                user.DisplayName = userProfile.DisplayName;
                user.Email = userProfile.Email;
                _userProfileRepo.Update(user);
                return NoContent();
            }
            else
            {
                return NotFound();
            }
        }
    }
}