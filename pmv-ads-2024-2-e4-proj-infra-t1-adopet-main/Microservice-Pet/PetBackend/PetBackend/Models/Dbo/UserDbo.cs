using AspNetCore.Identity.MongoDbCore.Models;
using MongoDB.Bson.Serialization.Attributes;
using MongoDbGenericRepository.Attributes;
using UserBackend.Models.Dbo;

namespace UserBackend.Models.Identity
{

    [CollectionName("users")]
    public class UserDbo : MongoIdentityUser<Guid>
    {

        [BsonElement("name"), BsonRepresentation(MongoDB.Bson.BsonType.String)]
        public string Name { get; set; }

        [BsonElement("surname"), BsonRepresentation(MongoDB.Bson.BsonType.String)]
        public string Surname { get; set; }
        [BsonElement("contact"), BsonRepresentation(MongoDB.Bson.BsonType.Int64)]
        public long Contact { get; set; }
        [BsonElement("about"), BsonRepresentation(MongoDB.Bson.BsonType.String)]
        public string About { get; set; }

        [BsonElement("updatedAt"), BsonRepresentation(MongoDB.Bson.BsonType.DateTime)]
        public DateTime? UpdatedAt { get; set; }

        [BsonElement("address")]
        public AddressDbo Address { get; set; }
    }
}
