using UserBackend.Models.Dto;

namespace UserBackend.Interfaces.ExternalService.Model
{
    public class GetListPetsResponse
    {
        public List<PetDto> PetList { get; set; }
    }
}
