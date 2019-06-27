using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AuthenticationService.Models;

namespace AuthenticationService.Repository
{
    public class AuthRepository : IAuthRepository
    {
        //Define a private variable to represent AuthDbContext
        private readonly AuthDbContext authDbContext;

        public AuthRepository(AuthDbContext dbContext)
        {
            authDbContext = dbContext;
        }

        //This methos should be used to Create a new User
        public bool CreateUser(User user)
        {
            authDbContext.Add(user);
            authDbContext.SaveChanges();
            return true;
        }

        //This methos should be used to check the existence of user
        public bool IsUserExists(string userId)
        {
            return authDbContext.Users.Any(u => u.UserId == userId);
        }

        //This methos should be used to Login a user
        public bool LoginUser(User user)
        {
            if (!IsUserExists(user.UserId))
            {
                return false;
            }

            return authDbContext.Users.Any(u => u.UserId == user.UserId && u.Password == user.Password);
        }
    }
}
