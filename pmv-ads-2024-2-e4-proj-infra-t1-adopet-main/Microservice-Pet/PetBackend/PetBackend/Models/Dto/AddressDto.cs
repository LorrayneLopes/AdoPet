using MongoDB.Bson.Serialization.Attributes;

namespace UserBackend.Models.Dto
{
    public class AddressDto
    {
        public string City { get; set; }
        public string State { get; set; }
        public string About { get; set; }
    }
}
