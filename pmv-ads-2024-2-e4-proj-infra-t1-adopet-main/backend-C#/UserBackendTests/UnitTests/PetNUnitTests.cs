using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserBackend.Interfaces.Services;
using UserBackend.Models.Dbo;
using UserBackend.Models.Dto;
using UserBackend.Services;

namespace UserBackend.NewFolder
{
    [TestFixture]

    public class PetServiceTests
    {
        private IValidationService _petValidationService;

        [SetUp]
        public void Setup()
        {
            _petValidationService = new ValidationService();
        }

        [Test]
        public void CreatePetValidation_ShouldThrowException_WhenPetIsNull()
        {
            // Arrange
            PetDto newPet = null;

            // Act & Assert
            var exception = Assert.Throws<ArgumentException>(() => _petValidationService.CreatePetValidation(newPet));
            StringAssert.Contains("Pet", exception.Message);
        }

        [Test]
        public void CreatePetValidation_ShouldThrowException_WhenNameIsEmpty()
        {
            // Arrange
            var newPet = new PetDto { Name = "", UserId = Guid.NewGuid() };

            // Act & Assert
            var exception = Assert.Throws<ArgumentException>(() => _petValidationService.CreatePetValidation(newPet));
            Assert.IsTrue(exception.Message.Contains("Name"));
        }

        [Test]
        public void CreatePetValidation_ShouldThrowException_WhenUserIdIsEmpty()
        {
            // Arrange
            var newPet = new PetDto { Name = "Buddy", UserId = Guid.Empty };

            // Act & Assert
            var exception = Assert.Throws<ArgumentException>(() => _petValidationService.CreatePetValidation(newPet));
            Assert.IsTrue(exception.Message.Contains("UserId"));
        }

        [Test]
        public void CreatePetValidation_ShouldThrowException_WhenAllFieldsAreEmpty()
        {
            // Arrange
            var newPet = new PetDto();

            // Act & Assert
            var exception = Assert.Throws<ArgumentException>(() => _petValidationService.CreatePetValidation(newPet));
            StringAssert.Contains("Name", exception.Message);
            StringAssert.Contains("UserId", exception.Message);
            StringAssert.Contains("State", exception.Message);
            StringAssert.Contains("City", exception.Message);
            StringAssert.Contains("About", exception.Message);
            StringAssert.Contains("Specie", exception.Message);
            StringAssert.Contains("Gender", exception.Message);
            StringAssert.Contains("Size", exception.Message);
            StringAssert.Contains("VeterinaryCare", exception.Message);
            StringAssert.Contains("Temperament", exception.Message);
            StringAssert.Contains("LiveWellWith", exception.Message);
            StringAssert.Contains("Sociability", exception.Message);
            StringAssert.Contains("Image", exception.Message);
        }

        [Test]
        public void CreatePetValidation_ShouldNotThrowException_WhenAllFieldsAreValid()
        {
            // Arrange
            var newPet = new PetDto
            {
                Name = "Buddy",
                UserId = Guid.NewGuid(),
                Address = new AddressDto { City = "Sample City", State = "Sample State", About = "About address" },
                Specie = ESpecie.Cachorro,
                Gender = EGender.Macho,
                Size = ESize.PequenoPorte,
                VeterinaryCare = EVeterinaryCare.Vacinado,
                Temperament = ETemperament.Independente,
                LiveWellWith = ELiveWellWith.Apartamento,
                Sociability = ESociability.Gatos,
                Image = "image_url"
            };

            // Act & Assert
            Assert.DoesNotThrow(() => _petValidationService.CreatePetValidation(newPet));
        }
    }
}
