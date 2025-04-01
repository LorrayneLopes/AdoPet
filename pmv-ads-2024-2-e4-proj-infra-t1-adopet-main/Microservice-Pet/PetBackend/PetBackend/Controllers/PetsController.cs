using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using UserBackend.Interfaces.Services;
using UserBackend.Models.Dbo;
using UserBackend.Models.Dto;
using UserBackend.Models.Identity;

namespace UserBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PetsController : ControllerBase
    {
        private readonly IPetService _petService;

        public PetsController(IPetService petService)
        {
            _petService = petService;
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> CreatePet([FromBody] PetDto newPet)
        {
            try
            {
                 PetDto createdPet = await _petService.CreatePet(newPet);
                return Ok(createdPet);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [Authorize]
        [HttpGet]
         public async Task<IActionResult> GetPets()
          {
              try
              {
                  List<PetDto> allPetsDto = await _petService.GetAllPets();
                  return Ok(allPetsDto);
              }
              catch (Exception ex)
              {
                  return BadRequest(ex.Message);
              }
          }

        [HttpGet("filter")]
        public async  Task<IActionResult> GetPetsByFilter(int Age, string City, string State, ESpecie Specie)
        {
            try
            {
                List<PetDto> filteredPets = await _petService.GetPetsByFilter(Specie, Age, City, State);
                return Ok(filteredPets);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize]
        [HttpGet("find/{userEmail}")]
        public async Task<IActionResult> GetPetsByUserEmail([FromRoute]string userEmail)
        {
            try
            {
                List<PetDto> allPetsByUser = await _petService.GetPetsByUserEmail(userEmail);
                return Ok(allPetsByUser);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


          [Authorize]
          [HttpGet("{id}")]
          public async Task<IActionResult> GetPetById([FromRoute] string id)
          {
              try
              {
                  PetDto pet = await _petService.GetPetById(id);
                  if (pet == null)
                  {
                      return NotFound();
                  }
                  return Ok(pet);
              }
              catch (Exception ex)
              {
                  return BadRequest(ex.Message);
              }
          }

          [Authorize]
          [HttpPut]
          public async Task<IActionResult> EditPet([FromBody] PetDto editPetRequest)
          {
              try
              {
                  PetDto updatedPet = await _petService.EditPet(editPetRequest);
                  if (updatedPet == null)
                  {
                      return NotFound();
                  }
                  return Ok(updatedPet);
              }
              catch (Exception ex)
              {
                  return BadRequest(ex.Message);
              }
          }
           
          [Authorize]
          [HttpDelete("{id}")]
          public async Task<IActionResult> DeletePet(string id)
          {
              try
              {
                  bool deleted = await _petService.DeletePet(id);
                  if (!deleted)
                  {
                      return NotFound();
                  }
                  return Ok();
              }
              catch (Exception ex)
              {
                  return BadRequest(ex.Message);
              }
          }
    }
}
