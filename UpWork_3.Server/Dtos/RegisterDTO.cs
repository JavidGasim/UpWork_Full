using System.ComponentModel.DataAnnotations;

namespace UpWork.Dtos
{
    public class RegisterDTO
    {
        [Required]
        public string? Username { get; set; }
        [Required]
        public string? Firstname { get; set; }
        [Required]
        public string? Lastname { get; set; }
        [Required]
        public string? Email { get; set; }
        [Required]
        public string? Password { get; set; }
        [Required]
        public string? Country { get; set; }
        [Required]
        public string? Role { get; set; }
        [Required]
        public DateTime BirthDate { get; set; }
    }
}
