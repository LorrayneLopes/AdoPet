using Microsoft.AspNetCore.Mvc;
using Refit;
using UserBackend.Interfaces.ExternalService.Model;
using UserBackend.Interfaces.Services;
using UserBackend.Models.Dbo;
using UserBackend.Models.Dto;
using UserBackend.Models.Identity;

namespace UserBackend.Interfaces.ExternalService
{
    public interface IPetMicroservice
    {
        [Delete("/Pets/{id}")]
        Task DeletePet([Authorize("Bearer")] string token, string id);

        [Get("/Pets")]
        Task<List<PetDto>> GetAllPets([Authorize("Bearer")] string token);

        [Get("/Pets/{id}")]
        Task<PetDto> GetPetById([Authorize("Bearer")] string token, string id);

        [Get("/Pets/find/{userEmail}")]
        Task<List<PetDto>> GetPetsByUserEmail([Authorize("Bearer")] string token, string userEmail);

        [Get("/Pets/filter")]
        Task<List<PetDto>> GetPetsByFilter([Authorize("Bearer")] string token, [FromQuery] ESpecie Specie, [FromQuery] int Age, [FromQuery] string City, [FromQuery] string State);

        [Post("/Pets")]
        Task<PetDto> CreatePet([Authorize("Bearer")] string token, [Body] PetDto newPet);

        [Put("/Pets")]
        Task<PetDto> EditPet([Authorize("Bearer")] string token, [FromBody] PetDto editPetRequest);
    }
}
