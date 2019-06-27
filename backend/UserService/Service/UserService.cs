using System;
using UserService.Exceptions;
using UserService.Models;
using UserService.Repository;

namespace UserService.Service
{
    public class UserService : IUserService
    {
        //define a private variable to represent repository

        private readonly IUserRepository _repository;

        //Use constructor Injection to inject all required dependencies.

        public UserService(IUserRepository userRepository)
        {
            _repository = userRepository;
        }

        //This method should be used to delete an existing user.
        public bool DeleteUser(string userId)
        {
            var isDeleted = _repository.DeleteUser(userId);
            if (!isDeleted)
            {
                throw new UserNotFoundException($"This user id does not exist");
            }
            return true;
        }
        //This method should be used to delete an existing user
        public User GetUserById(string userId)
        {
            var user = _repository.GetUserById(userId);
            if (user == null)
            {
                throw new UserNotFoundException($"This user id does not exist");
            }
            return user;
        }
        //This method is used to register a new user
        public User RegisterUser(User user)
        {
            var users = _repository.GetUserById(user.UserId);
            if (users != null)
            {
                throw new UserNotCreatedException($"This user id already exists");
            }

            return _repository.RegisterUser(user);
        }
        //This methos is used to update an existing user
        public bool UpdateUser(string userId, User user)
        {
            var userToUpdate = _repository.GetUserById(userId);
            if (userToUpdate == null)
            {
                throw new UserNotFoundException($"This user id does not exist");
            }
            userToUpdate.Name = user.Name;
            userToUpdate.Contact = user.Contact;

            var isUpdated = _repository.UpdateUser(userId, userToUpdate);
            return isUpdated;
        }
    }
}
