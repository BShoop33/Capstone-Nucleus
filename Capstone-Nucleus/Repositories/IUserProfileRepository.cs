﻿using Capstone_Nucleus.Models;

namespace Capstone_Nucleus.Repositories
{
    public interface IUserProfileRepository
    {
        void Add(UserProfile userProfile);

        UserProfile GetByFirebaseUserId(string firebaseUserId);

        UserProfile GetById(int id);

        public void Update(UserProfile userProfile);
    }
}