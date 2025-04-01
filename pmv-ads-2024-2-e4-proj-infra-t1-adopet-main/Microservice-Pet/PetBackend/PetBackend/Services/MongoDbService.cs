using AspNetCore.Identity.MongoDbCore.Infrastructure;
using MongoDB.Bson;
using MongoDB.Driver;

namespace UserBackend.Services
{
    public class MongoDbService
    {

        private readonly IConfiguration _configuration;
        private readonly IMongoDatabase? _database;
        public IMongoDatabase? Database => _database;

        public MongoDbService(IConfiguration configuration)
        {
            const string connectionUri = "mongodb+srv://vitorAdmin:Teste123@adopetdb.s2svl.mongodb.net/?retryWrites=true&w=majority&appName=adopetDb";
            var mongoUrl = MongoUrl.Create(connectionUri);
            var mongoClient = new MongoClient(mongoUrl);
            _database = mongoClient.GetDatabase(mongoUrl.ApplicationName);


            var settings = MongoClientSettings.FromConnectionString(connectionUri);
            // Set the ServerApi field of the settings object to set the version of the Stable API on the client
            settings.ServerApi = new ServerApi(ServerApiVersion.V1);
            // Create a new client and connect to the server
            var client = new MongoClient(settings);
            // Send a ping to confirm a successful connection
            try
            {
                var result = client.GetDatabase("admin").RunCommand<BsonDocument>(new BsonDocument("ping", 1));
                Console.WriteLine("Pinged your deployment. You successfully connected to MongoDB!");
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
            }
        }

        public async Task<MongoDbIdentityConfiguration> setConfigsMongoDbIdentity()
        {
         return  new MongoDbIdentityConfiguration
            {
                MongoDbSettings = new MongoDbSettings
                {
                    ConnectionString = "mongodb+srv://vitorAdmin:Teste123@adopetdb.s2svl.mongodb.net/?retryWrites=true&w=majority&appName=adopetDb",
                    DatabaseName = "adopetDb"
                },
                IdentityOptionsAction = options =>
                {
                    options.Password.RequireDigit = false;
                    options.Password.RequiredLength = 8;
                    options.Password.RequireNonAlphanumeric = true;
                    options.Password.RequireLowercase = false;

                    options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(10);
                    options.Lockout.MaxFailedAccessAttempts = 5;

                    options.User.RequireUniqueEmail = true;

                }
            };
        }

    }
}
