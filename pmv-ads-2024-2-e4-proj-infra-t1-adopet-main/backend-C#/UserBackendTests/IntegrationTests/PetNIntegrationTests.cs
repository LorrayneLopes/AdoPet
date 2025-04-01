using AspNetCore.Identity.MongoDbCore.Models;
using Refit;
using System.Net;
using System.Net.Http;
using UserBackend.Interfaces.ExternalService;
using UserBackend.Models.Dbo;
using UserBackend.Models.Dto;

namespace UserBackend.IntegrationTests
{
    [TestFixture]
    public class PetNIntegrationTests
    {
        private readonly HttpClient _httpClient;
        private readonly IPetMicroservice _petMicroservice;
        public string Token { get; } = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI4MTFmNzU0ZC1lNmE4LTRhZDYtYmI0Mi1lYmVmNjFjYjgyMmQiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiQWRtaW4iLCJqdGkiOiI2ZjU3NzhlNy05MmZlLTQxZDEtYTJkNy1jNjBkODQzMzA0MWYiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjgxMWY3NTRkLWU2YTgtNGFkNi1iYjQyLWViZWY2MWNiODIyZCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlVTRVIiLCJleHAiOjE3MzExMTMyNTcsImlzcyI6Imh0dHBzOi8vbG9jYWxob3N0OjgwODEiLCJhdWQiOiJodHRwczovL2xvY2FsaG9zdDo4MDgxIn0.cmdxNfwjYFqsiQJPdTUurvh6-b1MaQUZOac5jy_pEwE";

        public PetNIntegrationTests()
        {
            _httpClient = new HttpClient
            {
                BaseAddress = new Uri("https://petbackendapi.azurewebsites.net/api") 
            };

            _petMicroservice = RestService.For<IPetMicroservice>(_httpClient);
        }
        [Test]
        public async Task GetPetsByFilter_ShouldReturnAListOfDogs_WhenSpecieIsSpecified()
        {
         // Arrange

         //Act
            var ListOfDogsResponse = await _petMicroservice.GetPetsByFilter(Token, ESpecie.Cachorro,0, "All",  "All");

         //Assert
            Assert.That(ListOfDogsResponse, Is.Not.Null);
        }

        [Test]
        public async Task CreatePet_ShouldReturnPet_WhenValidTokenAndPetProvided()
        {
            // Arrange
            PetDto newPetToValidate = new()
            { 
                Name = "Dog Teste", 
                Age = 3,
                UserId = Guid.Parse("811f754d-e6a8-4ad6-bb42-ebef61cb822d"), 
                Address = new AddressDto
                {
                    City = "Cidade Teste",
                    State = "SP",
                    About = "About Test"
                },
                Specie = ESpecie.Cachorro,
                Gender = EGender.Macho,
                Sociability = ESociability.Cachorros,
                Image = "https://example.com/image.jpg"
            };
            //Act
            var newPetCreated = await _petMicroservice.CreatePet(Token, newPetToValidate);

            //Assert
            Assert.That(newPetCreated, Is.Not.Null);
            await _petMicroservice.DeletePet(Token, newPetCreated.Id);
        }


        [Test]
        public async Task GetAllPets_ShouldReturnAListOfPets_WhenValidTokenProvided()
        {
            //Act
            var newPetCreated = await _petMicroservice.GetAllPets(Token);

            //Assert
            Assert.That(newPetCreated, Is.Not.Null);
        }


        [Test]
        public async Task GetPetById_ShouldReturnASinglePet_WhenValidTokenAndIdProvided()
        {  
            // Arrange
            PetDto newPetToValidate = new()
            {
                Name = "Dog Test by ID",
                Age = 3,
                UserId = Guid.Parse("811f754d-e6a8-4ad6-bb42-ebef61cb822d"),
                Address = new AddressDto
                {
                    City = "Cidade Teste",
                    State = "SP",
                    About = "About Test"
                },
                Specie = ESpecie.Cachorro,
                Gender = EGender.Macho,
                Sociability = ESociability.Cachorros,
                Image = "https://example.com/image.jpg"
            };
            PetDto petCreated = await _petMicroservice.CreatePet(Token, newPetToValidate);
            
            //Act
            PetDto PetById = await _petMicroservice.GetPetById(Token, petCreated.Id);

            //Assert
            Assert.That(PetById, Is.Not.Null);

        }

        

        [Test]
        public async Task GetPetsByUserEmail_ShouldReturnAListOfPets_WhenValidTokenAndEmailProvided()
        {

            //Arrange
            string email = "admin@admin.com";

            //Act
            List<PetDto> petsByEmail = await _petMicroservice.GetPetsByUserEmail(Token, email);

            //Assert
            Assert.That(petsByEmail, Is.Not.Null);

        }

        
        [Test]
        public async Task EditPet_ShouldEditAPet_WhenValidTokenAndPetProvided()
        {
            // Arrange
            PetDto newPetToEdit = new()
            {
                Name = "Dog Test",
                Age = 3,
                UserId = Guid.Parse("811f754d-e6a8-4ad6-bb42-ebef61cb822d"),
                Address = new AddressDto
                {
                    City = "Cidade Teste",
                    State = "SP",
                    About = "About Test"
                },
                Specie = ESpecie.Cachorro,
                Gender = EGender.Macho,
                Sociability = ESociability.Cachorros,
                Image = "https://example.com/image.jpg"
            };
            PetDto petToEdit = await _petMicroservice.CreatePet(Token, newPetToEdit);

            //Act
            petToEdit.Name = "Dog Test Name Edit";
            PetDto petEdited = await _petMicroservice.EditPet(Token, petToEdit);

            //Assert
            Assert.That(newPetToEdit.Name,Is.Not.EqualTo(petEdited.Name));

            await _petMicroservice.DeletePet(Token, petEdited.Id);

        }



        
        [Test]
        public async Task DeletePet_ShouldDeleteAPet_WhenValidTokenAndPetIdProvided()
        {
            // Arrange
            PetDto newPetToEdit = new()
            {
                Name = "Dog Test to Delete",
                Age = 3,
                UserId = Guid.Parse("811f754d-e6a8-4ad6-bb42-ebef61cb822d"),
                Address = new AddressDto
                {
                    City = "Cidade Teste",
                    State = "SP",
                    About = "About Test"
                },
                Specie = ESpecie.Cachorro,
                Gender = EGender.Macho,
                Sociability = ESociability.Cachorros,
                Image = "https://example.com/image.jpg"
            };
            PetDto petToDelete = await _petMicroservice.CreatePet(Token, newPetToEdit);

            //Act
            await _petMicroservice.DeletePet(Token, petToDelete.Id);
           
            try
            {
                var petDeleted = await _petMicroservice.GetPetById(Token, petToDelete.Id);

                Assert.Fail("Expected exception was not thrown.");
            }
            catch (ApiException ex)
            {
                Assert.That(ex.StatusCode, Is.EqualTo(HttpStatusCode.NotFound)); 
            }
        }
       


    }
}
