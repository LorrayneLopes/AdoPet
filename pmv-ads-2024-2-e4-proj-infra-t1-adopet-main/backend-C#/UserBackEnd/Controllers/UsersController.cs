
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using UserBackend.Interfaces.Services;
using UserBackend.Models.Dbo;
using UserBackend.Models.Dto;
using UserBackend.Models.Identity;
using UserBackend.Models.Requests;

namespace UserBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;
        public UsersController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest loginRequest)
        {
            try
            {
                LoginResponse newUserStored = await _userService.Login(loginRequest);
                return Ok(newUserStored);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> CreateUser(CreateUserRequest newUser)
        {
            try
            {
                RegisterResponse newUserStored = await _userService.CreateUser(newUser);
                if (newUserStored.Success == false) return BadRequest(newUserStored);
                return Ok(newUserStored);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            try
            {
                List<UserDto> allUsersDto = await _userService.GetUser();
                return Ok(allUsersDto);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize]
        [HttpPut]
        public async Task<IActionResult> UpdateUser(UpdateUserRequest updateUser)
        {
            try
            {
                UpdateUserResponse allUsersDto = await _userService.UpdateUser(updateUser);
                return Ok(allUsersDto);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }


        }

        [Authorize]
        [HttpGet("{Id}")]
        public async Task<IActionResult> GetUserById(Guid Id)
        {
            try
            {
                var user = await _userService.GetUserById(Id);

                if (user == null) return NotFound("User not found.");
                return Ok(user);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize]
        [HttpGet("{Id}/address")]

        public async Task<IActionResult> GetUserAddress(Guid Id)
        {
            try
            {
                AddressDto userAddress = await _userService.GetUserAddressById(Id);
                if (userAddress is null) throw new Exception("User not found");
                return Ok(userAddress);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize]
        [HttpDelete("{Id}")]

        public async Task<IActionResult> DeleteUser(Guid Id)
        {
            try
            {
                bool delete = await _userService.DeleteUser(Id);
                if (delete) return Ok("User deleted");
                return NotFound();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //Use just the first time, please, create the role "USER"
        [HttpPost("roles")]
        public async Task<IActionResult> CreateRoles(CreateRoleRequest newUser)
        {
            try
            {
                CreateRoleResponse newUserStored = await _userService.CreateRole(newUser);
                return Ok(newUserStored);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
