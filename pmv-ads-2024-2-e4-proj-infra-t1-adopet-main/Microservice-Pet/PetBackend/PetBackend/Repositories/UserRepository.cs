
using MongoDB.Driver;
using UserBackend.Interfaces.Repositories;
using UserBackend.Models.Dbo;
using UserBackend.Models.Dto;
using UserBackend.Models.Identity;
using UserBackend.Models.Requests;
using UserBackend.Services;

namespace UserBackend.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly IMongoCollection<UserDbo> _Users;
        public UserRepository(MongoDbService mongoDbService)
        {
            _Users = mongoDbService.Database?.GetCollection<UserDbo>("users");

        }
        public async Task<List<UserDbo>> GetUsers()
        {
            List<UserDbo> allUsers = await _Users.Find(FilterDefinition<UserDbo>.Empty).ToListAsync();
            return allUsers;
        }

        public async Task<Guid> GetUserIdByEmail(string Email)
        {
            FilterDefinition<UserDbo> UserDboFilter = Builders<UserDbo>.Filter
                         .Eq(r => r.Email, Email.Trim().ToLower());
            UserDbo userFound = await _Users.Find(UserDboFilter).FirstOrDefaultAsync();
            if (userFound != null)
            {
                return userFound.Id;
            }
            else {
                return Guid.Empty;
            }
        }

        public async Task<UpdateUserResponse> UpdateUser(UpdateUserRequest newUser)
        {

            try
            {
                FilterDefinition<UserDbo> userDb = Builders<UserDbo>.Filter
                            .Eq(userDb => userDb.Email, newUser.Email);

                if (userDb == null) return new UpdateUserResponse { Message = "User not found", Success = false };

                UpdateDefinition<UserDbo> update = Builders<UserDbo>.Update
                    .Set(userDb => userDb.UserName, newUser.Name)
                    .Set(userDb => userDb.Email, newUser.Email)
                    .Set(userDb => userDb.Surname, newUser.Surname)
                    .Set(userDb => userDb.Contact, newUser.Contact)
                    .Set(userDb => userDb.About, newUser.About)
                    .Set(userDb => userDb.UpdatedAt, DateTime.UtcNow)
                    .Set(userDb => userDb.Address, new AddressDbo
                    {
                        About = newUser.Address.About,
                        City = newUser.Address.City,
                        State = newUser.Address.State,
                    });

                UpdateResult updatedUserResult = await _Users.UpdateOneAsync(userDb, update);

                return new UpdateUserResponse
                {
                    Success = true,
                    Message = "User updated succefully"
                };
            }
            catch (Exception)
            {

                throw;
            }
        }


        public async Task<UserDbo> GetUserById(Guid userId)
        {
            var filter = Builders<UserDbo>.Filter.Eq(u => u.Id, userId);
            return await _Users.Find(filter).FirstOrDefaultAsync();

        }


        
    }
}
