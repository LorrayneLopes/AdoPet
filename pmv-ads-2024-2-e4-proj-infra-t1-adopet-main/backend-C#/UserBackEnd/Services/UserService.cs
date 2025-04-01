using Amazon;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using MongoDB.Driver;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using UserBackend.Interfaces.Repositories;
using UserBackend.Interfaces.Services;
using UserBackend.Models.Dbo;
using UserBackend.Models.Dto;
using UserBackend.Models.Identity;
using UserBackend.Models.Requests;
using UserBackend.Repositories;
using static MongoDB.Driver.WriteConcern;

namespace UserBackend.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly UserManager<UserDbo> _userManager;
        private readonly RoleManager<ApplicationRole> _roleManager;
        private readonly IPetService _petService;
        private readonly IValidationService _validationService;
        public UserService(IUserRepository userRepository, UserManager<UserDbo> userManager,
            RoleManager<ApplicationRole> roleManager, IPetService petService, IValidationService validationService)
        {
            _userRepository = userRepository;
            _userManager = userManager;
            _roleManager = roleManager;
            _petService = petService;
            _validationService = validationService;
        }

        public async Task<LoginResponse> Login(LoginRequest loginRequest)
        {
            try
            {
                UserDbo user = await _userManager.FindByEmailAsync(loginRequest.Email);


                if (user is null || !await _userManager.CheckPasswordAsync(user, loginRequest.Password))
                {
                    return new LoginResponse { Message = "Invalid email/password", Success = false };
                }

                List<Claim> claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(JwtRegisteredClaimNames.Jti,Guid.NewGuid().ToString()),
                new Claim(ClaimTypes.NameIdentifier,user.Id.ToString())
            };

                IList<string> roles = await _userManager.GetRolesAsync(user);
                IEnumerable<Claim> roleClaims = roles.Select(x => new Claim(ClaimTypes.Role, x));
                claims.AddRange(roleClaims);

                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("w8sc7PIpT+1gKHblLcMfkzSPtp6JkhqlpTDHohQ9iW0="));
                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                var expires = DateTime.Now.AddMinutes(30);
                var token = new JwtSecurityToken(
                    issuer: "https://localhost:8081",
                    audience: "https://localhost:8081",
                    claims: claims,
                    expires: expires,
                    signingCredentials: creds
                    );

                return new LoginResponse
                {
                    AccessToken = new JwtSecurityTokenHandler().WriteToken(token),
                    Message = "Login Successful",
                    Email = user?.Email,
                    Success = true,
                    UserId = user?.Id.ToString()
                };
            }
            catch (Exception)
            {

                throw;
            }
        }



        public async Task<List<UserDto>> GetUser()
        {
            List<UserDbo> allUsersDbo = await _userRepository.GetUsers();

            List<UserDto> allUsersDto = allUsersDbo.Select(x =>
            {
                return new UserDto
                {
                    Id = x.Id,
                    Name = x.Name,
                    Surname = x.Surname,
                    Email = x.Email,
                    About = x.About,
                    Contact = x.Contact,
                    Address = new AddressDto
                    {
                        City = x.Address.City,
                        State = x.Address.State
                    }


                };
            }).ToList();
            return allUsersDto;

        }

        public async Task<UserDto> GetUserById(Guid userId)
        {
            try
            {
                UserDbo user = await _userRepository.GetUserById(userId);
                if (user is null) throw new Exception("User not found");
                return new UserDto
                {
                    Id = user.Id,
                    Name = user.UserName,

                    Surname = user.Surname,
                    Email = user.Email,
                    About = user.About,
                    Contact = user.Contact,
                    Address = new AddressDto
                    {
                        City = user.Address.City,
                        State = user.Address.State
                    }


                };
            }
            catch (Exception)
            {

                throw;
            }
        }

        public async Task<RegisterResponse> CreateUser(CreateUserRequest newUser)
        {
            try
            {
                _validationService.CreateUserValidation(newUser);
                UserDbo userExists = await _userManager.FindByEmailAsync(newUser.Email.Trim().ToLower());
                if (userExists != null) return new RegisterResponse { Message = "User already exists", Success = false };


                UserDbo newUserToStore = new UserDbo
                {

                    Email = newUser.Email.Trim().ToLower(),
                    Contact = newUser.Contact,
                    Surname = newUser.Surname,
                    PasswordHash = newUser.Password,
                    ConcurrencyStamp = Guid.NewGuid().ToString(),
                    UserName = Guid.NewGuid().ToString(),
                    Name = newUser.Name,
                    Address = new AddressDbo
                    {
                        State = newUser.Address.State,
                        City = newUser.Address.City,
                        CreatedAt = DateTime.UtcNow
                    },
                    About = newUser.About
                };
                var createUserResult = await _userManager.CreateAsync(newUserToStore, newUser.Password);
                if (!createUserResult.Succeeded) return new RegisterResponse
                {
                    Message = $"Create user failed: {string.Join(", ", createUserResult?.Errors.Select(x => x.Description) ?? Enumerable.Empty<string>())}",
                    Success = false
                };

                var addUserToRoleResult = await _userManager.AddToRoleAsync(newUserToStore, "User");
                if (!addUserToRoleResult.Succeeded) return new RegisterResponse
                {
                    Message = $"Create user succeded but could not add user to role" +
                    $" {createUserResult?.Errors}",
                    Success = false
                };

                return new RegisterResponse
                {
                    Success = true,
                    Message = "User registered succefully"
                };
            }
            catch (Exception ex)
            {

                return new RegisterResponse { Message = ex.Message, Success = false };
            }
        }

        public async Task<UpdateUserResponse> UpdateUser(UpdateUserRequest newUser)
        {
            try
            {


                return await _userRepository.UpdateUser(newUser);


            }
            catch (Exception ex)
            {

                return new UpdateUserResponse { Message = ex.Message, Success = false };
            }
        }


        public async Task<CreateRoleResponse> CreateRole(CreateRoleRequest newRole)
        {
            var appRole = new ApplicationRole { Name = newRole.Role };
            var createRole = await _roleManager.CreateAsync(appRole);

            return new CreateRoleResponse { Message = "Role created succefully" };
        }

        public async Task<AddressDto> GetUserAddressById(Guid userId)
        {
            try
            {
                var user = await _userRepository.GetUserById(userId);
                if (user is null) throw new Exception("User not found");
                return new AddressDto
                {
                    City = user.Address.City,
                    State = user.Address.State
                };
            }
            catch (Exception)
            {

                throw;
            }
        }

        public async Task<bool> DeleteUser(Guid userId)
        {
            try
            {
                UserDbo user = await _userRepository.GetUserById(userId);
                if (user is null) throw new Exception("User not found");
                List<PetDto> petsByUser = await _petService.GetPetsByUserEmail(user.Email);
                if (petsByUser.Count > 0) throw new Exception("It's not possible to delete a user with pets");
                var t1 = await _userRepository.DeleteUser(userId);;
                return t1;
            }
            catch (Exception)
            {

                throw;
            }


        }

    }
}
