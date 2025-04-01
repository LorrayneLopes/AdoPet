using UserBackend.Models.Dto;
using UserBackend.Models.Identity;
using UserBackend.Models.Requests;

namespace UserBackend.Interfaces.Services
{
    public interface IUserService
    {
        Task<LoginResponse> Login(LoginRequest loginRequest);
        Task<List<UserDto>> GetUser();
        Task<UserDto> GetUserById(Guid userId);
        Task<RegisterResponse> CreateUser(CreateUserRequest newUser);
        Task<UpdateUserResponse> UpdateUser(UpdateUserRequest newUser);
        Task<bool> DeleteUser(Guid userId);
        Task<CreateRoleResponse> CreateRole(CreateRoleRequest newUser);
        Task<AddressDto> GetUserAddressById(Guid userId);
    }
}