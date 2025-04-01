using MongoDB.Driver;
using UserBackend.Interfaces.Repositories;
using UserBackend.Models.Dbo;
using UserBackend.Models.Dto;
using UserBackend.Models.Identity;
using UserBackend.Services;

namespace UserBackend.Repositories
{
    public class PetRepository : IPetRepository
    {
        private readonly IMongoCollection<PetDbo> _petCollection;

        public PetRepository(MongoDbService mongoDbService)
        {
            _petCollection = mongoDbService.Database?.GetCollection<PetDbo>("pets");
        }

        public async Task<PetDbo> CreatePet(PetDbo newPet)
        {
            await _petCollection.InsertOneAsync(newPet);
            return newPet;
        }

        public async Task<PetDbo> EditPet(PetDbo pet)
        {
            var filter = Builders<PetDbo>.Filter.Eq(p => p.Id, pet.Id);
            await _petCollection.ReplaceOneAsync(filter, pet);
            return pet;
        }

        public async Task<List<PetDbo>> GetAllPets()
        {
            return await _petCollection.Find(p => true).ToListAsync();
        }

        public async Task<List<PetDbo>> GetPetsByUserEmail(Guid userId)
        {
            return await _petCollection.Find(p => p.UserId == userId).ToListAsync();
        }

        public async Task<PetDbo> GetPetById(string id)
        {
            PetDbo petFound = await _petCollection.Find(p => p.Id == id).FirstOrDefaultAsync();
            if (petFound != null) return petFound;
            return null;
        }

        public async Task<bool> DeletePet(PetDbo petDbo)
        {
            var filter = Builders<PetDbo>.Filter.Eq(p => p.Id, petDbo.Id);
            var result = await _petCollection.DeleteOneAsync(filter);
            return result.DeletedCount == 1;
        }

        public async Task<List<PetDbo>> GetPetsByFilter(bool allPets,ESpecie Specie, int Age, string City, string State)
        {


                List<PetDbo> petsDbo =  _petCollection.AsQueryable().Where(x => !allPets
                                                                               ? ((Specie > 0 ? x.Specie == Specie : true)
                                                                              && (Age > 0 ? x.Age == Age : true)
                                                                              && (City != null ? x.Address.City == City : true)
                                                                              && (State != null ? x.Address.State == State : true)): true).ToList();

            return petsDbo;
        }
    }
}