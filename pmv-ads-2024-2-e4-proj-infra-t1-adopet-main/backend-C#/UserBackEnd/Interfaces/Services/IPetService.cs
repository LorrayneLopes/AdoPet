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
        Task<List<PetDto>> GetPetsByFilter(int Age, string City = "All", string State = "All", ESpecie Specie = ESpecie.All);
        Task<PetDto> GetPetById(string id);
        Task<PetDto> EditPet(PetDto editPetRequest);
        Task<bool> DeletePet(string id);
    }
}