using Amazon.Runtime.Internal;
using AspNetCore.Identity.MongoDbCore.Models;
using Microsoft.AspNetCore.Mvc.RazorPages;
using MongoDB.Driver;
using Refit;
using UserBackend.Interfaces.ExternalService;
using UserBackend.Interfaces.ExternalService.Model;
using UserBackend.Interfaces.Repositories;
using UserBackend.Interfaces.Services;
using UserBackend.Models.Dbo;
using UserBackend.Models.Dto;
using UserBackend.Models.Identity;
using UserBackend.Repositories;
using static System.Net.Mime.MediaTypeNames;

namespace UserBackend.Services
{
    public class PetBackendService : IPetService
    {
        private readonly IPetRepository _petRepository;
        private readonly IUserRepository _userRepository;
        private readonly IPetMicroservice _petMicroservice;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IValidationService _validationService;
        public PetBackendService(IPetRepository petRepository, IUserRepository userRepository, IPetMicroservice petMicroservice,
            IHttpContextAccessor httpContextAccessor, IValidationService validationService)
        {
            _petRepository = petRepository;
            _userRepository = userRepository;
            _petMicroservice = petMicroservice;
            _httpContextAccessor = httpContextAccessor;
            _validationService = validationService;
        }

        public async Task<PetDto> CreatePet(PetDto newPet)
        {
            try
            {
                _validationService.CreatePetValidation(newPet);
                PetDto createdPet = await _petMicroservice.CreatePet(GetToken(), newPet);
                return createdPet;
            }
            catch (ApiException e)
            {
                var responseContent = e.Content;
                throw new Exception(responseContent);
            }
        }
        public async Task<List<PetDto>> GetAllPets()
        {
            try
            {
                string tokenValue = GetToken();
                List<PetDto> allPets = await _petMicroservice.GetAllPets(tokenValue);
                if (allPets is not null) return allPets;
                return new List<PetDto>(0);
            }
            catch (ApiException e)
            {
                var responseContent = e.Content;
                throw new Exception(responseContent);
            }
        }
        public async Task<List<PetDto>> GetPetsByUserEmail(string userEmail)
        {
            try
            {
                if (userEmail is null) throw new ArgumentException("Please, provide a valid email");
                Guid userId = await _userRepository.GetUserIdByEmail(userEmail);
                if (userId == Guid.Empty) throw new ArgumentException("User not found");
                List<PetDto> allPetsByUser = await _petMicroservice.GetPetsByUserEmail(GetToken(), userEmail);
                if (allPetsByUser is not null) return allPetsByUser;
                return new List<PetDto>(0);
            }
            catch (ApiException e)
            {
                var responseContent = e.Content;
                throw new Exception(responseContent);
            }
        }
        public async Task<List<PetDto>> GetPetsByFilter(int Age, string City, string State, ESpecie Specie)
        {
            try
            {
                List<PetDto> filteredPetsDto = await _petMicroservice.GetPetsByFilter(GetToken(), Specie, Age, City, State);
                if (filteredPetsDto is not null) return filteredPetsDto;
                return new List<PetDto>(0);
            }
            catch (ApiException e)
            {
                var responseContent = e.Content;
                throw new Exception(responseContent);
            }
        }
        public async Task<PetDto> GetPetById(string id)
        {
            try
            {
                PetDto petDto = await _petMicroservice.GetPetById(GetToken(), id);
                if (petDto is not null) return petDto;
                return null;
            }
            catch (ApiException e)
            {
                var responseContent = e.Content;
                throw new Exception(responseContent);
            }
        }
        public async Task<PetDto> EditPet(PetDto editPetRequest)
        {
            try
            {
                var petDto = await _petMicroservice.EditPet(GetToken(), editPetRequest);
                return petDto;
            }
            catch (ApiException e)
            {
                var responseContent = e.Content;
                throw new Exception(responseContent);
            }
        }
        public async Task<bool> DeletePet(string id)
        {
            try
            {
                await _petMicroservice.DeletePet(GetToken(), id);
                return true;
            }
            catch (ApiException e)
            {
                var responseContent = e.Content;
                throw new Exception(responseContent);
            }
        }
        private string GetToken()
        {
            var tokenValue = "";
            var context = _httpContextAccessor.HttpContext;
            if (context != null && context.Request.Headers.TryGetValue("Authorization", out var token))
            {
                tokenValue = token.ToString().Replace("Bearer ", string.Empty).Trim();
            }
            return tokenValue;
        }
    }
}
