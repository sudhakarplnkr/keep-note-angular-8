using System;
using System.Net;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NoteService.Exceptions;
using NoteService.Models;
using NoteService.Service;

namespace NoteService.Controllers
{
    /*
      As in this assignment, we are working with creating RESTful web service to create microservices, hence annotate
      the class with [ApiController] annotation and define the controller level route as per REST Api standard.
  */
    [Authorize]
    public class NotesController : Controller
    {
        /*
        NoteService should  be injected through constructor injection. Please note that we should not create service
        object using the new keyword
        */
        private readonly INoteService service;

        public NotesController(INoteService _service)
        {
            service = _service;
        }

        /*
	    * Define a handler method which will create a specific note by reading the
	    * Serialized object from request body and save the note details in the
	    * database.This handler method should return any one of the status messages
	    * basis on different situations: 
	    * 1. 201(CREATED) - If the note created successfully. 
	    
	    * This handler method should map to the URL "/api/note/{userId}" using HTTP POST method
	    */

        [HttpPost]
        [Route("/api/notes/{userId}")]
        public IActionResult Post([FromBody]Note note, string userId)
        {
            try
            {
                var creatednote = service.CreateNote(note);
                return StatusCode((int)HttpStatusCode.Created, note);
            }
            catch (NoteNotFoundExeption dce)
            {
                return StatusCode((int)HttpStatusCode.Conflict, dce.Message);
            }
            catch (Exception err_msg)
            {
                return StatusCode(404, err_msg.Message);
            }
        }

        /*
         * Define a handler method which will delete a note from a database.
         * This handler method should return any one of the status messages basis 
         * on different situations: 
         * 1. 200(OK) - If the note deleted successfully from database. 
         * 2. 404(NOT FOUND) - If the note with specified noteId is not found.
         *
         * This handler method should map to the URL "/api/note/{userId}/{noteId}" using HTTP Delete
         */

        [HttpDelete]
        [Route("/api/notes/{userId}/{noteId}")]
        public IActionResult Delete(string userId, int noteId)
        {
            try
            {
                var isDeleted = service.DeleteNote(userId, noteId);
                return StatusCode((int)HttpStatusCode.OK, isDeleted);
            }
            catch (NoteNotFoundExeption dce)
            {
                return StatusCode((int)HttpStatusCode.NotFound, dce.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(404, ex.Message);
            }
        }

        /*
         * Define a handler method which will update a specific note by reading the
         * Serialized object from request body and save the updated note details in a
         * database. 
         * This handler method should return any one of the status messages
         * basis on different situations: 
         * 1. 200(OK) - If the note updated successfully.
         * 2. 404(NOT FOUND) - If the note with specified noteId is not found.
         * 
         * This handler method should map to the URL "/api/note/{userId}/{noteId}" using HTTP PUT method.
         */

        [HttpPut]
        [Route("/api/notes/{userId}/{noteId}")]
        public IActionResult Put([FromBody]Note note, string userId, int noteId)
        {
            try
            {
                var isUpdated = service.UpdateNote(noteId, userId, note);
                return StatusCode((int)HttpStatusCode.OK, isUpdated);
            }
            catch (NoteNotFoundExeption dce)
            {
                return StatusCode((int)HttpStatusCode.NotFound, dce.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(404, ex.Message);
            }
        }

        /*
         * Define a handler method which will get us the all notes by a userId.
         * This handler method should return any one of the status messages basis on
         * different situations: 
         * 1. 200(OK) - If the note found successfully. 
         * 
         * This handler method should map to the URL "/api/note/{userId}" using HTTP GET method
         */

        [HttpGet]
        [Route("/api/notes/{userId}")]
        public IActionResult Get(string userId)
        {
            try
            {
                return StatusCode((int)HttpStatusCode.OK, service.GetAllNotesByUserId(userId));
            }
            catch (NoteNotFoundExeption dce)
            {
                return StatusCode((int)HttpStatusCode.NotFound, dce.Message);
            }
            catch (Exception ex)
            {
                return StatusCode((int)HttpStatusCode.NotFound, ex.Message);
            }
        }

        /*
         * Define a handler method which will show details of a specific note created by specific 
         * user. This handler method should return any one of the status messages basis on
         * different situations: 
         * 1. 200(OK) - If the note found successfully. 
         * 2. 404(NOT FOUND) - If the note with specified noteId is not found.
         * This handler method should map to the URL "/api/note/{userId}/{noteId}" using HTTP GET method
         * where "id" should be replaced by a valid reminderId without {}
         * 
         */
    }
}
