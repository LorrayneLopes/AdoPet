using System.Text.Json.Serialization;
using UserBackend.Models.Dto;
using UserBackend.Models.Requests;

namespace UserBackend.Models.Identity
{
    public class CreatePetRequest
    {
        [JsonPropertyName("pet")]
        public PetRequest Pet { get; set; }


        [JsonPropertyName("image")]
        public string Image {  get; set; }

    }
}
