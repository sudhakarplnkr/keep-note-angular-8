﻿using System;
using System.Collections.Generic;
using MongoDB.Bson.Serialization.Attributes;

namespace NoteService.Models
{
    public class Note
    {
        /*
	 * This class should have seven properies
	 * (Id,Title,Content,CreationDate,
	 * Category,Reminders,CreatedBy). Out of these seven properties Id should
     * be annotated with [BsonId]. The value of CreationDate should not be
	 * accepted from the user but should be always initialized with the system date.
	 */
        [BsonId]
        public int Id { get; set; }
        [BsonElement("title")]
        public string Title { get; set; }
        [BsonElement("content")]
        public string Content { get; set; }
        [BsonElement("createdBy")]
        public string CreatedBy { get; set; }
        [BsonElement("CreationDate")]
        public DateTime CreationDate { get; set; }
        [BsonElement("category")]
        public Category Category { get; set; }
        [BsonElement("reminder")]
        public List<Reminder> Reminders { get; set; }

    }
}
