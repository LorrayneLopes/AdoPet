using System.Drawing;
using System.Net;
using System.Xml.Linq;
using UserBackend.Interfaces.Services;
using UserBackend.Models.Dbo;
using UserBackend.Models.Dto;
using UserBackend.Models.ErrorHandlers;
using UserBackend.Models.Identity;
using static System.Net.Mime.MediaTypeNames;

namespace UserBackend.Services
{
    public class ValidationService : IValidationService
    {

        public void CreateUserValidation(CreateUserRequest newUser)
        {
            var validationErrors = new List<string>();

            if (newUser == null)
                throw new ArgumentException("Please send a valid user");

            var fieldsToCheck = new Dictionary<string, Func<string>>
                {
                    { "About", () => newUser.About },
                    { "Password", () => newUser.Password },
                    { "Contact", () => newUser.Contact > 0 ? "." : null },
                    { "Email", () => newUser.Email },
                    { "Name", () => newUser.Name },
                    { "Surname", () => newUser.Surname },
                    { "Address", () => newUser.Address?.ToString() },
                    { "City", () => newUser.Address?.City },
                    { "State", () => newUser.Address?.State },
                    { "Address - About", () => newUser.Address?.About }
                };



            foreach (var field in fieldsToCheck)
            {
                if (string.IsNullOrEmpty(field.Value()))
                    validationErrors.Add($"{(validationErrors.Count == 0 ? "Please, fill the" : "")}'{field.Key}' ");
            }

            if (validationErrors.Count > 0)
            {
                throw new ArgumentException(string.Join(", ", validationErrors) + "field(s)");
            }
        }

        public void CreatePetValidation(PetDto newPet)
        {
            
                var validationErrors = new List<string>();

                if (newPet == null)
                    throw new ArgumentException("Please send a valid Pet");

                var fieldsToCheck = new Dictionary<string, Func<string>>
                {
                    { "Name", () => newPet.Name?.ToString() },
                    { "State", () => newPet.Address?.State?.ToString() },
                    { "City", () => newPet.Address?.City?.ToString() },
                    { "About", () => newPet.Address?.About?.ToString() },
                    { "UserId", () => newPet.UserId != Guid.Empty ? "." : null },
                    { "Specie", () => newPet.Specie > 0 ? "." : null},
                    { "Gender", () => newPet.Gender> 0 ? "." : null},
                    { "Size", () => newPet.Size> 0 ? "." : null },
                    { "VeterinaryCare", () => newPet.VeterinaryCare> 0 ? "." : null },
                    { "Temperament", () => newPet.Temperament> 0 ? "." : null},
                    { "LiveWellWith", () => newPet.LiveWellWith> 0 ? "." : null },
                    { "Sociability", () => newPet.Sociability> 0 ? "." : null },
                    { "Image", () => newPet.Image?.ToString() }
                };


                foreach (var field in fieldsToCheck)
                {
                    if (string.IsNullOrEmpty(field.Value()))
                        validationErrors.Add($"{(validationErrors.Count == 0 ? "Please, fill the " : "")}'{field.Key}' ");
                }

                if (validationErrors.Count > 0)
                {
                    throw new ArgumentException(string.Join(", ", validationErrors) + "field(s)");
                }
            
        }
    }
}
