using System.ComponentModel.DataAnnotations;

namespace UpWork.Dtos
{
    public class ApplicantDTO
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
        [Required]
        public List<string>? Skills { get; set; }
    }
}
