using UserBackend.Models.Dbo;
using UserBackend.Models.Dto;
using UserBackend.Models.Identity;

namespace UserBackend.Interfaces.Services
{
    public interface IPetService
    {
        Task<PetDto> CreatePet(PetDto newPet);
        Task<List<PetDto>> GetAllPets();
        Task<List<PetDto>> GetPetsByUserEmail(string userEmail);
        Task<List<PetDto>> GetPetsByFilter(ESpecie Specie, int Age, string City, string State);

        Task<PetDto> GetPetById(string id);
        Task<PetDto> EditPet(PetDto editPetRequest);
        Task<bool> DeletePet(string id);
    }
}