using Capstone_Nucleus.Models;

namespace Capstone_Nucleus.Repositories
{
    public interface IUserProfileRepository
    {
        UserProfile GetByFirebaseUserId(string firebaseUserId);

        UserProfile GetById(int id);

        void Add(UserProfile userProfile);

        public void Update(UserProfile userProfile);
    }
}