using UserBackend.Models.Dto;
using UserBackend.Models.Requests;

namespace UserBackend.Models.Identity
{
    public class EditPetRequest
    {
        public PetDto Pet { get; set; }
    }
}
