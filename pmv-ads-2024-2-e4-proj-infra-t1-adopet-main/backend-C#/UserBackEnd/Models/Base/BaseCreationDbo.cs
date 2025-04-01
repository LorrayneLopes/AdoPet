using MongoDB.Bson.Serialization.Attributes;

namespace UserBackend.Models.Base
{
    public class BaseCreationDbo
    {
        [BsonElement("createdAt"), BsonRepresentation(MongoDB.Bson.BsonType.DateTime)]
        public DateTime CreatedAt { get; set; }
        [BsonElement("updatedAt"), BsonRepresentation(MongoDB.Bson.BsonType.DateTime)]
        public DateTime? UpdatedAt { get; set; }
    }
}
