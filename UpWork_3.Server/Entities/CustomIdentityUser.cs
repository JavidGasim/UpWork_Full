using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace UpWork.Entities
{
    public class CustomIdentityUser : IdentityUser
    {
        public string? Firstname { get; set; }
        public string? Lastname { get; set; }
        public string? Country { get; set; }
        public string? ImagePath { get; set; }
        public DateTime? BirthDate { get; set; }

    }
}
