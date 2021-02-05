using Capstone_Nucleus.Data;
using Capstone_Nucleus.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace Capstone_Nucleus.Repositories
{
    public class UserProfileRepository : IUserProfileRepository
    {
        private readonly ApplicationDbContext _context;

        public UserProfileRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public UserProfile GetByFirebaseUserId(string firebaseUserId)
        {
            return _context.UserProfile
                .Include(up => up.UserType)
                .FirstOrDefault(up => up.FirebaseUserId == firebaseUserId);
        }

        public UserProfile GetById(int id)
        {
            return _context.UserProfile
                .FirstOrDefault(up => up.Id == id);
        }

        public void Add(UserProfile userProfile)
        {
            _context.Add(userProfile);
            _context.SaveChanges();
        }

        public void Update(UserProfile userProfile)
        {
            _context.Entry(userProfile).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            _context.SaveChanges();
        }
    }
}