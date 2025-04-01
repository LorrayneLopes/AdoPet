namespace UserBackend.Models.Identity
{
    public class RegisterResponse
    {
        public string Message { get; set; }

        public string[] errorMessages { get; set; } = new string[0];
        public bool Success { get; set; }
    }
}
