using UserBackend.Models.Dbo;
using UserBackend.Models.Dto;
using UserBackend.Models.Identity;

namespace UserBackend.Interfaces.Repositories
{
    public interface IPetRepository
    {
        Task<PetDbo> CreatePet(PetDbo newPet);
        Task<PetDbo> EditPet(PetDbo pet);
        Task<List<PetDbo>> GetAllPets();
        Task<List<PetDbo>> GetPetsByUserEmail(Guid userId);
        Task<List<PetDbo>> GetPetsByFilter(bool bringAllPets, ESpecie Specie, int Age, string City, string State);
        Task<PetDbo> GetPetById(string id);
        Task<bool> DeletePet(PetDbo petDbo);
    }
}
