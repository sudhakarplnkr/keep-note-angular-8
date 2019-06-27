using AuthenticationService.Exceptions;
using AuthenticationService.Models;
using AuthenticationService.Repository;
using System;

namespace AuthenticationService.Service
{
    public class AuthService : IAuthService
    {
        private readonly IAuthRepository repository;
        //define a private variable to represent repository

        //Use constructor Injection to inject all required dependencies.

        public AuthService(IAuthRepository authRepository)
        {
            repository = authRepository;
        }

        //This methos should be used to register a new user
        public bool RegisterUser(User user)
        {
            if (repository.IsUserExists(user.UserId))
            {
                throw new UserAlreadyExistsException($"This userId {user.UserId} already in use");
            }

            return repository.CreateUser(user);
        }

        //This method should be used to login for existing user
        public bool LoginUser(User user)
        {
            if (repository.LoginUser(user))
            {
                return true;
            }
            throw new UserAlreadyExistsException($"Invalid user id or password");            
        }
    }
}
