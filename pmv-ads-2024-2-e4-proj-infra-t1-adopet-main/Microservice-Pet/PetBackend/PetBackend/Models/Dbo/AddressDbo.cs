using MongoDB.Bson.Serialization.Attributes;
using UserBackend.Models.Base;

namespace UserBackend.Models.Dbo
{
    public class AddressDbo : BaseCreationDbo
    {

        [BsonElement("city"), BsonRepresentation(MongoDB.Bson.BsonType.String)]
        public string City { get; set; }

        [BsonElement("state"), BsonRepresentation(MongoDB.Bson.BsonType.String)]
        public string State { get; set; }

        [BsonElement("about"), BsonRepresentation(MongoDB.Bson.BsonType.String)]
        public string About { get; set; }
    }
}
