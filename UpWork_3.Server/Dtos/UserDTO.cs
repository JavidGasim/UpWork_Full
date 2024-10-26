using System.ComponentModel.DataAnnotations;

namespace UpWork.Dtos
{
    public class UserDTO
    {
        public string? UserName { get; set; }
        public string? Firstname { get; set; }
        public string? Lastname { get; set; }
        public string? Country { get; set; }
        public DateTime BirthDate { get; set; }
    }
}
