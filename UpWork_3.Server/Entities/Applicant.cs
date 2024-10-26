using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace UpWork.Entities
{
    public class Applicant : CustomIdentityUser
    {
        public int Connections { get; set; } = 10;
        public List<string>? Skills { get; set; }
    }
}
