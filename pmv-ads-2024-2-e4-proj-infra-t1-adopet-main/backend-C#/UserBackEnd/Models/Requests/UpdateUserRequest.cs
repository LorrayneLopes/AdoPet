using UserBackend.Models.Dto;

namespace UserBackend.Models.Identity
{
    public class UpdateUserRequest
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Surname { get; set; }
        public long Contact { get; set; }
        public string About { get; set; }
        public AddressDto Address { get; set; }
    }
}
