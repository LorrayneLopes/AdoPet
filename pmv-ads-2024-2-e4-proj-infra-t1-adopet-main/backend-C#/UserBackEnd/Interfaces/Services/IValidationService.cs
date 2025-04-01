using UserBackend.Models.Dto;
using UserBackend.Models.Identity;

namespace UserBackend.Interfaces.Services
{
    public interface IValidationService
    {
        public void CreateUserValidation(CreateUserRequest newUser);

        public void CreatePetValidation(PetDto newPet);
    }
}
