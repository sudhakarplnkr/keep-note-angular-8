using System;
using Microsoft.AspNetCore.Mvc;
using CategoryService.Service;
using CategoryService.Models;
using CategoryService.Exceptions;
using Microsoft.AspNetCore.Http;
using System.Net;
using Microsoft.AspNetCore.Authorization;

namespace CategoryService.API.Controllers
{
    /*
    As in this assignment, we are working with creating RESTful web service to create microservices, hence annotate
    the class with [ApiController] annotation and define the controller level route as per REST Api standard.
    */
    [Authorize]
    public class CategoryController : Controller
    {
        /*
     CategoryService should  be injected through constructor injection. Please note that we should not create service
     object using the new keyword

    */
        private readonly ICategoryService service;

        private string err_msg = "Something wrong please try Later";

        public CategoryController(ICategoryService _service)
        {
            service = _service;
        }

        /*
	 * Define a handler method which will create a category by reading the
	 * Serialized category object from request body and save the category in
	 * database. This handler method should return any one of the status messages basis on
	 * different situations: 
	 * 1. 201(CREATED - In case of successful creation of the category
	 * 2. 409(CONFLICT) - In case of duplicate categoryId
	 *
	 * 
	 * This handler method should map to the URL "/api/category" using HTTP POST
	 * method".
	 */

        [HttpPost]
        [Route("/api/category")]
        public IActionResult Post([FromBody]Category category)
        {
            try
            {
                var createdCategory = service.CreateCategory(category);
                return StatusCode((int)HttpStatusCode.Created, createdCategory);
            }
            catch (CategoryNotCreatedException dce)
            {
                return StatusCode((int)HttpStatusCode.Conflict, dce.Message);
            }
            catch (Exception)
            {
                return StatusCode(404, err_msg);
            }
        }

        [HttpGet]
        [Route("api/category/{categoryId}")]
        public IActionResult Get(int categoryId)
        {
            try
            {
                return StatusCode((int)HttpStatusCode.OK, service.GetCategoryById(categoryId));
            }
            catch (CategoryNotFoundException dce)
            {
                return StatusCode((int)HttpStatusCode.NotFound, dce.Message);
            }
            catch (Exception)
            {
                return StatusCode((int)HttpStatusCode.NotFound, err_msg);
            }
        }

        /*
         * Define a handler method which will delete a category from a database.
         * 
         * This handler method should return any one of the status messages basis on
         * different situations: 1. 200(OK) - If the category deleted successfully from
         * database. 2. 404(NOT FOUND) - If the category with specified categoryId is
         * not found. 
         * 
         * This handler method should map to the URL "/api/category/{id}" using HTTP Delete
         * method" where "id" should be replaced by a valid categoryId without {}
         */
        [HttpDelete]
        [Route("/api/category/{categoryId}")]
        public IActionResult Delete(int categoryId)
        {
            try
            {
                var isDeleted = service.DeleteCategory(categoryId);
                return StatusCode((int)HttpStatusCode.OK, isDeleted);
            }
            catch (CategoryNotFoundException dce)
            {
                return StatusCode((int)HttpStatusCode.NotFound, dce.Message);
            }
            catch (Exception)
            {
                return StatusCode(404, err_msg);
            }
        }


        /*
         * Define a handler method which will update a specific category by reading the
         * Serialized object from request body and save the updated category details in
         * database. This handler method should return any one of the status
         * messages basis on different situations: 1. 200(OK) - If the category updated
         * successfully. 2. 404(NOT FOUND) - If the category with specified categoryId
         * is not found. 
         * This handler method should map to the URL "/api/category/{id}" using HTTP PUT
         * method.
         */
        [HttpPut]
        [Route("/api/category/{categoryId}")]
        public IActionResult Put([FromBody]Category category, int categoryId)
        {
            try
            {
                var isUpdated = service.UpdateCategory(categoryId, category);
                return StatusCode((int)HttpStatusCode.OK, isUpdated);
            }
            catch (CategoryNotFoundException dce)
            {
                return StatusCode((int)HttpStatusCode.NotFound, dce.Message);
            }
            catch (Exception)
            {
                return StatusCode(404, err_msg);
            }
        }



        /*
         * Define a handler method which will get us the category by a userId.
         * This handler method should return any one of the status messages basis on
         * different situations: 1. 200(OK) - If the category found successfully. 
         * This handler method should map to the URL "/api/category/{userId}" using HTTP GET method
         */

        /*
     * Define a handler method which will get us the category by a categoryId.
     * This handler method should return any one of the status messages basis on
     * different situations: 1. 200(OK) - If the category found successfully. 
     * This handler method should map to the URL "/api/category/{categoryId}" using HTTP GET method. categoryId must be an integer
     */
        [HttpGet]
        [Route("/api/categories/{userId}")]
        public IActionResult Get(string userId)
        {
            try
            {
                return StatusCode((int)HttpStatusCode.OK, service.GetAllCategoriesByUserId(userId));
            }
            catch (Exception)
            {
                return StatusCode(404, err_msg);
            }
        }
    }
}
