using UserBackend.Models.Dto;
using UserBackend.Models.Identity;
using UserBackend.Models.Requests;

namespace UserBackend.Interfaces.Repositories
{
    public interface IUserRepository
    {
        Task<List<UserDbo>> GetUsers();
        Task<Guid> GetUserIdByEmail(string Email);
        Task<UpdateUserResponse> UpdateUser(UpdateUserRequest newUser);
        Task<UserDbo> GetUserById(Guid userId);
        Task<bool> DeleteUser(Guid user);
    }
}
