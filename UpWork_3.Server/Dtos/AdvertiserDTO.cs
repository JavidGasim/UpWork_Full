using System.ComponentModel.DataAnnotations;

namespace UpWork.Dtos
{
    public class AdvertiserDTO
    {
        [Required]
        public string? Firstname { get; set; }
        [Required]
        public string? Lastname { get; set; }
        [Required]
        [DataType(DataType.EmailAddress)]
        public string? EmailAddress { get; set; }
        [Required]
        [DataType(DataType.Password)]
        public string? Password { get; set; }
        [Required]
        public string? Country { get; set; }
        [Required]
        public DateTime BirthDate { get; set; }
    }
}
