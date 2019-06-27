using System;
using System.Net;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReminderService.Exceptions;
using ReminderService.Models;
using ReminderService.Service;

namespace ReminderService.Controllers
{
    /*
    As in this assignment, we are working with creating RESTful web service to create microservices, hence annotate
    the class with [ApiController] annotation and define the controller level route as per REST Api standard.
    */
    [Authorize]
    public class ReminderController : Controller
    {
        private readonly IReminderService service;

        private string err_msg = "Something wrong please try Later";
        /*
	 * From the problem statement, we can understand that the application requires
	 * us to implement five functionalities regarding reminder. They are as
	 * following:
	 * 
	 * 1. Create a reminder 
	 * 2. Delete a reminder 
	 * 3. Update a reminder 
	 * 4. Get all reminders by userId 
	 * 5. Get a specific reminder by id.
	 * 
	 */


        /*
     ReminderService should  be injected through constructor injection. Please note that we should not create service
     object using the new keyword
    */


        public ReminderController(IReminderService reminderService)
        {
            service = reminderService;
        }



        [HttpGet]
        [Route("/api/reminder/{reminderId}")]
        public IActionResult Get(int reminderId)
        {
            try
            {
                return StatusCode((int)HttpStatusCode.OK, service.GetReminderById(reminderId));
            }
            catch (ReminderNotFoundException dce)
            {
                return StatusCode((int)HttpStatusCode.NotFound, dce.Message);
            }
            catch (Exception)
            {
                return StatusCode((int)HttpStatusCode.NotFound, err_msg);
            }
        }

        [HttpGet]
        [Route("/api/reminders/{userId}")]
        public IActionResult Get(string userId)
        {
            try
            {
                return StatusCode((int)HttpStatusCode.OK, service.GetAllRemindersByUserId(userId));
            }
            catch (Exception)
            {
                return StatusCode(404, err_msg);
            }
        }

        [HttpPost]
        [Route("/api/reminder")]
        public IActionResult Post([FromBody]Reminder reminder)
        {
            try
            {
                var createdReminder = service.CreateReminder(reminder);
                return StatusCode((int)HttpStatusCode.Created, createdReminder);
            }
            catch (ReminderNotFoundException dce)
            {
                return StatusCode((int)HttpStatusCode.Conflict, dce.Message);
            }
            catch (Exception)
            {
                return StatusCode(404, err_msg);
            }
        }

        [HttpDelete]
        [Route("/api/reminder/{reminderId}")]
        public IActionResult Delete(int reminderId)
        {
            try
            {
                var isDeleted = service.DeleteReminder(reminderId);
                return StatusCode((int)HttpStatusCode.OK, isDeleted);
            }
            catch (ReminderNotFoundException dce)
            {
                return StatusCode((int)HttpStatusCode.NotFound, dce.Message);
            }
            catch (Exception)
            {
                return StatusCode(404, err_msg);
            }
        }

        [HttpPut]
        [Route("/api/reminder/{reminderId}")]
        public IActionResult Put([FromBody]Reminder reminder, int reminderId)
        {
            try
            {
                var isDeleted = service.UpdateReminder(reminderId, reminder);
                return StatusCode((int)HttpStatusCode.OK, isDeleted);
            }
            catch (ReminderNotFoundException dce)
            {
                return StatusCode((int)HttpStatusCode.NotFound, dce.Message);
            }
            catch (Exception)
            {
                return StatusCode(404, err_msg);
            }
        }
        /*
	 * Define a handler method which will create a reminder by reading the
	 * Serialized reminder object from request body and save the reminder in
	 * database. Please note that the reminderId has to be unique. This handler
	 * method should return any one of the status messages basis on different
	 * situations: 
	 * 1. 201(CREATED - In case of successful creation of the reminder
	 * 2. 409(CONFLICT) - In case of duplicate reminder ID
	 *
	 * This handler method should map to the URL "/api/reminder" using HTTP POST
	 * method".
	 */

        /*
         * Define a handler method which will delete a reminder from a database.
         * 
         * This handler method should return any one of the status messages basis on
         * different situations: 
         * 1. 200(OK) - If the reminder deleted successfully from database. 
         * 2. 404(NOT FOUND) - If the reminder with specified reminderId is not found.
         * 
         * This handler method should map to the URL "/api/reminder/{id}" using HTTP Delete
         * method" where "id" should be replaced by a valid reminderId without {}
         */

        /*
         * Define a handler method which will update a specific reminder by reading the
         * Serialized object from request body and save the updated reminder details in
         * a database. This handler method should return any one of the status messages
         * basis on different situations: 
         * 1. 200(OK) - If the reminder updated successfully. 
         * 2. 404(NOT FOUND) - If the reminder with specified reminderId is not found. 
         * 
         * This handler method should map to the URL "/api/reminder/{id}" using HTTP PUT
         * method.
         */

        /*
         * Define a handler method which will show details of a specific reminder. This
         * handler method should return any one of the status messages basis on
         * different situations: 
         * 1. 200(OK) - If the reminder found successfully. 
         * 2. 404(NOT FOUND) - If the reminder with specified reminderId is not found. 
         * 
         * This handler method should map to the URL "/api/reminder/{id}" using HTTP GET method
         * where "id" should be replaced by a valid reminderId without {}
         */

        /*
         * Define a handler method which will get us the all reminders.
         * This handler method should return any one of the status messages basis on
         * different situations: 
         * 1. 200(OK) - If the reminder found successfully. 
         * 2. 404(NOT FOUND) - If the reminder with specified reminderId is not found.
         * 
         * This handler method should map to the URL "/api/reminder" using HTTP GET method
         */
    }
}
