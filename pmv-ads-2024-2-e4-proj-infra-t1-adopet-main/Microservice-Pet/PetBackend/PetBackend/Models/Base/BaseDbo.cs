using MongoDB.Bson.Serialization.Attributes;

namespace UserBackend.Models.Base
{
    public class BaseDbo : BaseCreationDbo
    {
        [BsonId]
        [BsonElement("_id"), BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]
        public string Id { get; set; }
    }
}
