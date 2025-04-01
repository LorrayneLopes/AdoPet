using MongoDB.Driver;
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
        public PetBackendService(IPetRepository petRepository, IUserRepository userRepository)
        {
            _petRepository = petRepository;
            _userRepository = userRepository;
        }

        public async Task<PetDto> CreatePet(PetDto newPet)
        {
            UserDbo userDbo = await _userRepository.GetUserById(newPet.UserId);
            if (userDbo is null) throw new ArgumentException("User not found");

            PetDto petDto = new PetDto
            {
                Name = newPet.Name,
                Age = newPet.Age,
                UserId = newPet.UserId,
                Address = new AddressDto
                {
                    City = newPet.Address.City,
                    State = newPet.Address.State,
                    About = newPet.Address.About,
                },
                Specie = newPet.Specie,
                Gender = newPet.Gender,
                Size = newPet.Size,
                VeterinaryCare = newPet.VeterinaryCare,
                Temperament = newPet.Temperament,
                LiveWellWith = newPet.LiveWellWith,
                Sociability = newPet.Sociability,
                Image = newPet.Image,
            };

            PetDbo petDbo = ConvertPetDtoToDbo(petDto);

            PetDbo createdPet = await _petRepository.CreatePet(petDbo);
            return ConvertPetDboToDto(createdPet);
        }

        public async Task<List<PetDto>> GetAllPets()
        {
            var allPets = await _petRepository.GetAllPets();
            if (allPets is not null)
            {
                List<PetDto> filteredPets = allPets.Select(x => ConvertPetDboToDto(x)).ToList();
                return filteredPets;
            }
            return new List<PetDto>(0);
        }

        public async Task<List<PetDto>> GetPetsByUserEmail(string userEmail)
        {
            if (userEmail is null) throw new ArgumentException("Please, provide a valid email");
            Guid userId = await _userRepository.GetUserIdByEmail(userEmail);
            if (userId == Guid.Empty) throw new ArgumentException("User not found");
            List<PetDbo> allPetsByUser = await _petRepository.GetPetsByUserEmail(userId);

            if (allPetsByUser is not null)
            {
                List<PetDto> filteredPets = allPetsByUser.Select(x => ConvertPetDboToDto(x)).ToList();
                return filteredPets;
            }
            return new List<PetDto>(0);
        }

        public async Task<List<PetDto>> GetPetsByFilter(ESpecie Specie, int Age, string City, string State)
        {
            bool bringAllPets = Specie == ESpecie.All && Age == 0 && City == "All" && State == "All";
            List<PetDbo> filteredPetsDbo = await _petRepository.GetPetsByFilter(bringAllPets, Specie, Age, City, State);
            if (filteredPetsDbo is not null)
            {
                List<PetDto> filteredPets = filteredPetsDbo.Select(x => ConvertPetDboToDto(x)).ToList();
                return filteredPets;
            }
            return new List<PetDto>(0);
        }

        public async Task<PetDto> GetPetById(string id)
        {

            PetDbo petdbo = await _petRepository.GetPetById(id);
            if (petdbo is not null) return ConvertPetDboToDto(petdbo);
            return null;

        }

        public async Task<PetDto> EditPet(PetDto editPetRequest)
        {
            bool pet = await _petRepository.GetPetById(editPetRequest.Id) != null;
            if (!pet) throw new Exception("Pet not found");
            PetDbo petDboToUpdate = ConvertPetDtoToDbo(editPetRequest);
            petDboToUpdate.Id = editPetRequest.Id;
            petDboToUpdate.UpdatedAt = DateTime.UtcNow;
            petDboToUpdate.Address.UpdatedAt = DateTime.UtcNow;
            PetDbo updatedPet = await _petRepository.EditPet(petDboToUpdate);
            return ConvertPetDboToDto(updatedPet);
        }

        public async Task<bool> DeletePet(string id)
        {
            var pet = await _petRepository.GetPetById(id);
            if (pet == null)
            {
                return false;
            }

            return await _petRepository.DeletePet(pet);
        }

        private string ConvertImageToBase64(IFormFile petImage)
        {
            if (petImage is not null)
            {
                MemoryStream memoryStream = new MemoryStream();
                petImage.OpenReadStream().CopyTo(memoryStream);
                return Convert.ToBase64String(memoryStream.ToArray());
            }
            return "";
        }

        private PetDto ConvertPetDboToDto(PetDbo pet)
        {
            return new PetDto
            {
                Id = pet.Id,
                Name = pet.Name,
                Age = pet.Age,
                UserId = pet.UserId,
                Address = new AddressDto
                {
                    City = pet.Address.City,
                    State = pet.Address.State,
                    About = pet.Address.About,
                },
                Specie = pet.Specie,
                Gender = pet.Gender,
                Size = pet.Size,
                VeterinaryCare = pet.VeterinaryCare,
                Temperament = pet.Temperament,
                LiveWellWith = pet.LiveWellWith,
                Sociability = pet.Sociability,
                Image = pet.Image,
            };
        }

        private PetDbo ConvertPetDtoToDbo(PetDto petDto)
        {
            return new PetDbo
            {
                Name = petDto.Name,
                Age = petDto.Age,
                Address = new AddressDbo
                {
                    City = petDto.Address.City,
                    State = petDto.Address.State,
                    About = petDto.Address.About,
                },
                Image = petDto.Image,
                UserId = petDto.UserId,
                Specie = petDto.Specie,
                Gender = petDto.Gender,
                Size = petDto.Size,
                VeterinaryCare = petDto.VeterinaryCare,
                Temperament = petDto.Temperament,
                LiveWellWith = petDto.LiveWellWith,
                Sociability = petDto.Sociability,
            };
        }
    }
}
