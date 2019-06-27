﻿using System;
using MongoDB.Bson.Serialization.Attributes;

namespace ReminderService.Models
{
    public class Reminder
    {
        /*
	 * This class should have six properties
	 * (Id,Name,Description,Type,
	 * CreatedBy,CreationDate). Out of these six fields, the field
	 * Id should be annotated with [BsonId].The value of CreationDate should not
	 * be accepted from the user but should be always initialized with the system
	 * date.
	 */
        [BsonId]
        public int Id { get; set; }
        [BsonElement("name")]
        public string Name { get; set; }
        [BsonElement("Description")]
        public string Description { get; set; }
        [BsonElement("CreatedBy")]
        public string CreatedBy { get; set; }
        [BsonElement("creationDate")]
        public DateTime CreationDate { get; set; }
        [BsonElement("type")]
        public string Type { get; set; }
    }
}
