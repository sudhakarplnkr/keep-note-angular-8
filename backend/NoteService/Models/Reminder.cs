using MongoDB.Bson.Serialization.Attributes;
using System;

namespace NoteService.Models
{
    public class Reminder
    {
        /*
       * This class should have six properties
       * (Id,Name,Description,Type,CreatedBy,CreationDate).The value of CreationDate should not
       * be accepted from the user but should be always initialized with the system date.
         */
        [BsonId]
        public int Id { get; set; }
        [BsonElement("name")]
        public string Name { get; set; }
        [BsonElement("description")]
        public string Description { get; set; }
        [BsonElement("createdBy")]
        public string CreatedBy { get; set; }
        [BsonElement("creationDate")]
        public DateTime CreationDate { get; set; }
        [BsonElement("type")]
        public string Type { get; set; }
    }
}
