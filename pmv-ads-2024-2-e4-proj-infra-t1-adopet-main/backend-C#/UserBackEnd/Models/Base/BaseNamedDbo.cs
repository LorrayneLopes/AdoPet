using MongoDB.Bson.Serialization.Attributes;

namespace UserBackend.Models.Base
{
    public class BaseNamedDbo : BaseDbo
    {
        [BsonElement("name"), BsonRepresentation(MongoDB.Bson.BsonType.String)]
        public string Name { get; set; }
    }
}
