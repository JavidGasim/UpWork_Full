using System.ComponentModel.DataAnnotations;
using UpWork.Entities;

namespace UpWork.Dtos
{
    public class JobDTO
    {
        public string? Id { get; set; }
        public string? AdvertiserId { get; set; }
        public Advertiser? Advertiser { get; set; }
        [Required]
        [DataType(DataType.Text)]
        public string? Content { get; set; }
        [Required]
        public int RequiredConnections { get; set; }
        public List<string>? ExperienceLevel { get; set; }
        public List<string>? Tags { get; set; }
        public string? Price { get; set; }
        public bool IsDone { get; set; }
    }
}
