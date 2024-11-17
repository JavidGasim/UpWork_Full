using System.ComponentModel.DataAnnotations;

namespace UpWork_3.Server.Dtos
{
    public class ApplicantUpdateDTO
    {
        public string? UserName { get; set; }
        [DataType(DataType.EmailAddress)]
        public string? EmailAddress { get; set; }
        [DataType(DataType.Password)]
        public string? Password { get; set; }
        public string? Country { get; set; }
        public DateTime? BirthDate { get; set; }
        public List<string>? Skills { get; set; }
        public string? About { get; set; }
        public string? ImagePath { get; set; }

    }
}
