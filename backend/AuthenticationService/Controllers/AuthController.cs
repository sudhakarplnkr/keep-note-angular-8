using AuthenticationService.Exceptions;
using AuthenticationService.Models;
using AuthenticationService.Service;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;
using System.Text;

namespace AuthenticationService.Controllers
{
    /*
   As in this assignment, we are working with creating RESTful web service to create microservices, hence annotate
   the class with [ApiController] annotation and define the controller level route as per REST Api standard.
   */
   [Route("auth")]
   [ApiController]
    public class AuthController : Controller
    {
        private readonly IAuthService service;
        /*
       AuthService should  be injected through constructor injection. Please note that we should not create service
       object using the new keyword
      */
        public AuthController(IAuthService authService)
        {
            service = authService;
        }

        /*
	     * Define a handler method which will create a specific user by reading the
	     * Serialized object from request body and save the user details in the
	     * database. This handler method should return any one of the status messages
	     * basis on different situations:
	     * 1. 201(CREATED) - If the user created successfully. 
	     * 2. 409(CONFLICT) - If the userId conflicts with any existing user
	     * 
	     * This handler method should map to the URL "/api/auth/register" using HTTP POST method
    	 */
        [HttpPost]
        [Route("/api/auth/register")]
        public IActionResult Register([FromBody]User user)
        {
            try
            {
                return StatusCode((int)HttpStatusCode.Created, service.RegisterUser(user));
            }
            catch (UserAlreadyExistsException dce)
            {
                return StatusCode((int)HttpStatusCode.Conflict, dce.Message);
            }
        }

        /* Define a handler method which will authenticate a user by reading the Serialized user
         * object from request body containing the username and password. The username and password should be validated 
         * before proceeding ahead with JWT token generation. The user credentials will be validated against the database entries. 
         * The error should be return if validation is not successful. If credentials are validated successfully, then JWT
         * token will be generated. The token should be returned back to the caller along with the API response.
         * This handler method should return any one of the status messages basis on different
         * situations:
         * 1. 200(OK) - If login is successful
         * 2. 401(UNAUTHORIZED) - If login is not successful
         * 
         * This handler method should map to the URL "/api/auth/login" using HTTP POST method
        */
        [HttpPost]
        [Route("/api/auth/login")]
        public IActionResult Login([FromBody]User user)
        {
            try
            {
                var isLogin = service.LoginUser(user);
                if (isLogin)
                {
                    // authentication successful so generate jwt token
                    var tokenHandler = new JwtSecurityTokenHandler();
                    var key = Encoding.ASCII.GetBytes("authserver_secret_to_validate_token");
                    var tokenDescriptor = new SecurityTokenDescriptor
                    {
                        Subject = new ClaimsIdentity(new Claim[]
                        {
                    new Claim(ClaimTypes.Name, user.UserId)
                        }),
                        Expires = DateTime.UtcNow.AddDays(7),
                        SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                    };
                    var token = tokenHandler.CreateToken(tokenDescriptor);                    

                    return StatusCode((int)HttpStatusCode.OK, new { Token = tokenHandler.WriteToken(token), user.UserId });
                }
                return StatusCode((int)HttpStatusCode.Unauthorized);
            }
            catch (UserAlreadyExistsException dce)
            {
                return StatusCode((int)HttpStatusCode.Unauthorized, dce.Message);
            }
        }

        private string GetJWTToken(string userId)
        {
            var Claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.UniqueName, userId),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("authserver_secret_to_validate_token"));
            var cerds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                        issuer: "AuthServer",
                        audience: "jwtclient",
                        claims: Claims,
                        expires: DateTime.Now.AddMinutes(20),
                        signingCredentials: cerds
                        );
            var response = new
            {
                token = new JwtSecurityTokenHandler().WriteToken(token)
        };
            return JsonConvert.SerializeObject(response);
        }
    }
}
