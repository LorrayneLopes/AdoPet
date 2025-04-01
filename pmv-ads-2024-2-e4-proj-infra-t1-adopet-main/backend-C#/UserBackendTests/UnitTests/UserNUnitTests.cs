using Microsoft.AspNetCore.Identity;
using Moq;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Net;
using System.Security.Claims;
using System.Threading.Tasks;
using UserBackend.Interfaces.Repositories;
using UserBackend.Interfaces.Services;
using UserBackend.Models.Dbo;
using UserBackend.Models.Dto;
using UserBackend.Models.Identity;
using UserBackend.Models.Requests;
using UserBackend.Services;

namespace UserBackend.NewFolder
{
    [TestFixture]
    public class UserServiceTests
    {
        private IValidationService _validationService;

        [SetUp]
        public void Setup()
        {
            _validationService = new ValidationService();
        }

        [Test]
        public void CreateUserValidation_ShouldThrowException_WhenUserIsNull()
        {
            // Arrange
            CreateUserRequest newUser = null;

            // Act & Assert
            var exception = Assert.Throws<ArgumentException>(() => _validationService.CreateUserValidation(newUser));
            StringAssert.Contains("user", exception.Message);
        }

        [Test]
        public void CreateUserValidation_ShouldThrowException_WhenNameIsEmpty()
        {
            // Arrange
            var newUser = new CreateUserRequest { Name = "", Email = "test@example.com" };

            // Act & Assert
            var exception = Assert.Throws<ArgumentException>(() => _validationService.CreateUserValidation(newUser));
            Assert.IsTrue(exception.Message.Contains("Name"));
        }

        [Test]
        public void CreateUserValidation_ShouldThrowException_WhenEmailIsEmpty()
        {
            // Arrange
            var newUser = new CreateUserRequest { Name = "John", Email = "" };

            // Act & Assert
            var exception = Assert.Throws<ArgumentException>(() => _validationService.CreateUserValidation(newUser));
            Assert.IsTrue(exception.Message.Contains("Email"));
        }

        [Test]
        public void CreateUserValidation_ShouldThrowException_WhenAllFieldsAreEmpty()
        {
            // Arrange
            var newUser = new CreateUserRequest();

            // Act & Assert
            var exception = Assert.Throws<ArgumentException>(() => _validationService.CreateUserValidation(newUser));
            StringAssert.Contains("Name", exception.Message);
            StringAssert.Contains("Email", exception.Message);
            StringAssert.Contains("About", exception.Message);
            StringAssert.Contains("Contact", exception.Message);
            StringAssert.Contains("Surname", exception.Message);
            StringAssert.Contains("Password", exception.Message);
            StringAssert.Contains("Address", exception.Message);
            StringAssert.Contains("City", exception.Message);
            StringAssert.Contains("State", exception.Message);
            StringAssert.Contains("About", exception.Message);
        }

        [Test]
        public void CreateUserValidation_ShouldNotThrowException_WhenAllFieldsAreValid()
        {
            // Arrange
            var newUser = new CreateUserRequest
            {
                Name = "John",
                Email = "john@example.com",
                Password = "Password1234",
                Contact = 1234567890,
                Surname = "Doe",
                About = "About John",
                Address = new AddressDto { City = "Sample City", State = "Sample State", About = "About address" }
            };

            // Act & Assert
            Assert.DoesNotThrow(() => _validationService.CreateUserValidation(newUser));
        }
    }
}
