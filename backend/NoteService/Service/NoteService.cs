using System;
using System.Collections.Generic;
using NoteService.Exceptions;
using NoteService.Models;
using NoteService.Repository;

namespace NoteService.Service
{
    public class NoteService : INoteService
    {
        //define a private variable to represent repository
        private readonly INoteRepository noteRepository;

        //Use constructor Injection to inject all required dependencies.

        public NoteService(INoteRepository _noteRepository)
        {
            noteRepository = _noteRepository;
        }

        //This method should be used to create a new note.
        public bool CreateNote(Note note)
        {
            var notes = noteRepository.CreateNote(note);

            if (notes != null)
            {
                return notes;
            }
            else
            {
                throw new NoteAlreadyExistsException($"Note with id does not exist");
            }
        }

        //This method should be used to delete an existing note for a user
        public bool DeleteNote(string userId, int noteId)
        {
            var isDeleted = noteRepository.DeleteNote(userId, noteId);

            if (!isDeleted)
            {
                throw new NoteNotFoundExeption($"NoteId {noteId} for user {userId} does not exist");
            }
            return true;
        }

        //This methos is used to retreive all notes for a user
        public List<Note> GetAllNotesByUserId(string userId)
        {
            var noteList = noteRepository.FindAllNotesByUser(userId);

            return noteList;
        }

        //This method is used to update an existing note for a user
        public Note UpdateNote(int noteId, string userId, Note note)
        {
            if (noteRepository.UpdateNote(noteId, userId, note))
            {
                return note;
            }
            throw new NoteNotFoundExeption($"NoteId {noteId} for user {userId} does not exist");
        }

    }
}
