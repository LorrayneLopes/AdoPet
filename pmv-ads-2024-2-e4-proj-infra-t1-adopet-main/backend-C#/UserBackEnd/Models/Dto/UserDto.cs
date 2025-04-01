

namespace UserBackend.Models.Dto
{
    public class UserDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Surname { get; set; }
        public long Contact { get; set; }
        public string About { get; set; }
        public AddressDto Address { get; set; }
    }
}
