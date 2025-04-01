using MongoDB.Bson.Serialization.Attributes;
using MongoDbGenericRepository.Attributes;
using UserBackend.Models.Base;

namespace UserBackend.Models.Dbo
{
    [CollectionName("pets")]
    public class PetDbo : BaseNamedDbo

    {
        public int Age { get; set; }
        public AddressDbo Address { get; set; }
        public string Image { get; set; }
        public Guid UserId { get; set; }
        public ESpecie Specie { get; set; }
        public EGender Gender { get; set; }
        public ESize Size { get; set; }
        public EVeterinaryCare VeterinaryCare { get; set; }
        public ETemperament Temperament { get; set; }
        public ELiveWellWith LiveWellWith { get; set; }
        public ESociability Sociability { get; set; }
    }

    public enum ESpecie
    {
        Cachorro = 1,
        Gato,
        All
    }

    public enum EGender
    {
        Macho = 1,
        Femea
    }

    public enum ESize
    {
        PequenoPorte = 1,
        MedioPorte,
        GrandePorte
    }
    public enum EVeterinaryCare
    {
        Castrado = 1,
        Vacinado,
        Vermifugado,
        PrecisaDeCuidadosEspeciais
    }

    public enum ETemperament
    {
        Docil = 1,
        Agressivo,
        Calmo,
        Brincalhao,
        Sociavel,
        Arisco,
        Independente,
        Carente
    }

    public enum ELiveWellWith
    {
        CasaComQuintal = 1,
        Apartamento
    }

    public enum ESociability
    {
        Gatos = 1,
        Cachorros,
        Criancas,
        Desconhecidos
    }
}
