﻿using UserBackend.Models.Dbo;
using UserBackend.Models.Dto;

namespace UserBackend.Models.Requests
{
    public class PetRequest
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public int Age { get; set; }
        public Guid UserId { get; set; }
        public AddressDto Address { get; set; }
        public ESpecie Specie { get; set; }
        public EGender Gender { get; set; }
        public ESize Size { get; set; }
        public EVeterinaryCare VeterinaryCare { get; set; }
        public ETemperament Temperament { get; set; }
        public ELiveWellWith LiveWellWith { get; set; }
        public ESociability Sociability { get; set; }
    }
}
