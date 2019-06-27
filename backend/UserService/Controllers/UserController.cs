﻿using System;
using System.Net;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using UserService.Exceptions;
using UserService.Models;
using UserService.Service;

namespace UserService.Controllers
{
    /*
   As in this assignment, we are working with creating RESTful web service to create microservices, hence annotate
   the class with [ApiController] annotation and define the controller level route as per REST Api standard.
   */
    [Authorize]
    public class UserController : Controller
    {
        private readonly IUserService service;

        private string err_msg = "Something wrong please try Later";
        /*
   UserService should  be injected through constructor injection. Please note that we should not create service
   object using the new keyword
  */

        public UserController(IUserService userService)
        {
            service = userService;
        }

        [HttpGet]
        [Route("/api/user/{userId}")]
        public IActionResult Get(string userId)
        {
            try
            {
                return StatusCode((int)HttpStatusCode.OK, service.GetUserById(userId));
            }
            catch (UserNotFoundException dce)
            {
                return StatusCode((int)HttpStatusCode.NotFound, dce.Message);
            }
            catch (Exception)
            {
                return StatusCode((int)HttpStatusCode.NotFound, err_msg);
            }
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("/api/user")]
        public IActionResult Post([FromBody]User user)
        {
            try
            {
                var createduser = service.RegisterUser(user);
                return StatusCode((int)HttpStatusCode.Created, createduser);
            }
            catch (UserNotFoundException dce)
            {
                return StatusCode((int)HttpStatusCode.NotFound, dce.Message);
            }
            catch (UserNotCreatedException uae)
            {
                return StatusCode((int)HttpStatusCode.Conflict, uae.Message);
            }
        }


        [HttpDelete]
        [Route("/api/user/{userId}")]
        public IActionResult Delete(string userId)
        {
            try
            {
                var isDeleted = service.DeleteUser(userId);
                return StatusCode((int)HttpStatusCode.OK, isDeleted);
            }
            catch (UserNotFoundException dce)
            {
                return StatusCode((int)HttpStatusCode.NotFound, dce.Message);
            }
            catch (Exception)
            {
                return StatusCode(404, err_msg);
            }
        }

        [HttpPut]
        [Route("/api/user/{userId}")]
        public IActionResult Put([FromBody]User user, string userId)
        {
            try
            {
                var isDeleted = service.UpdateUser(userId, user);
                return StatusCode((int)HttpStatusCode.OK, user);
            }
            catch (UserNotFoundException dce)
            {
                return StatusCode((int)HttpStatusCode.NotFound, dce.Message);
            }
            catch (Exception)
            {
                return StatusCode(404, err_msg);
            }
        }

        /*
         * Define a handler method which will create a specific user by reading the
         * Serialized object from request body and save the user details in the
         * database. This handler method should return any one of the status messages
         * basis on different situations:
         * 1. 201(CREATED) - If the user created successfully. 
         * 2. 409(CONFLICT) - If the userId conflicts with any existing user
         * 
         * This handler method should map to the URL "/api/user" using HTTP POST method
         */

        /*
         * Define a handler method which will update a specific user by reading the
         * Serialized object from request body and save the updated user details in a
         * database. This handler method should return any one of the status messages
         * basis on different situations: 
         * 1. 200(OK) - If the user updated successfully.
         * 2. 404(NOT FOUND) - If the user with specified userId is not found.
         * 
         * This handler method should map to the URL "/api/user/{id}" using HTTP PUT method.
         */

        /*
         * Define a handler method which will delete a user from a database.
         * This handler method should return any one of the status messages basis on
         * different situations: 
         * 1. 200(OK) - If the user deleted successfully from database. 
         * 2. 404(NOT FOUND) - If the user with specified userId is not found.
         *
         * This handler method should map to the URL "/api/user/{id}" using HTTP Delete
         * method" where "id" should be replaced by a valid userId without {}
         */

        /*
         * Define a handler method which will show details of a specific user. This
         * handler method should return any one of the status messages basis on
         * different situations: 
         * 1. 200(OK) - If the user found successfully. 
         * 2. 404(NOT FOUND) - If the user with specified userId is not found. 
         * This handler method should map to the URL "/api/user/{id}" using HTTP GET method where "id" should be
         * replaced by a valid userId without {}
         */
    }
}
