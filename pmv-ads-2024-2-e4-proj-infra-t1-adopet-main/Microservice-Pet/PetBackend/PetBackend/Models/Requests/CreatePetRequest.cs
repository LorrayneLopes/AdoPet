using UserBackend.Models.Dto;
using UserBackend.Models.Requests;

namespace UserBackend.Models.Identity
{
    public class CreatePetRequest
    {
        public PetRequest Pet { get; set; }
        public string Image {  get; set; }

    }
}
