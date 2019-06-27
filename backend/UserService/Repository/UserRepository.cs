using System;
using System.Linq;
using MongoDB.Driver;
using UserService.Models;

namespace UserService.Repository
{
    public class UserRepository : IUserRepository
    {
        //define a private variable to represent UserContext
        private readonly UserContext userContext;

        public UserRepository(UserContext _context)
        {
            userContext = _context;
        }
        //This method should be used to delete an existing user.
        public bool DeleteUser(string userId)
        {
            var user = GetUserById(userId);
            if (user == null)
            {
                return false;
            }
            userContext.Users.DeleteOne(u => u.UserId == userId);
            return true;
        }

        //This method should be used to delete an existing user
        public User GetUserById(string userId)
        {
            return userContext.Users.Find(c => c.UserId == userId).FirstOrDefault();
        }
        //This method is used to register a new user
        public User RegisterUser(User user)
        {
            user.AddedDate = DateTime.Now;
            userContext.Users.InsertOne(user);
            return user;
        }
        //This methos is used to update an existing user
        public bool UpdateUser(string userId, User user)
        {
            userContext.Users.ReplaceOne(c => c.UserId == userId, user);
            return true;
        }
    }
}
