using System.ComponentModel.DataAnnotations;

namespace UpWork.Entities
{
    public class Job
    {
        public string? Id { get; set; }
        public string? AdvertiserId { get; set; }
        public Advertiser? Advertiser { get; set; }
        [Required]
        [DataType(DataType.Text)]
        public string? Content { get; set; }
        public bool IsDone { get; set; }
        [Required]
        public int RequiredConnections { get; set; }
        public List<string>? ExperienceLevel { get; set; }
        public List<string>? Tags { get; set; }
        public string? Price { get; set; }
    }
}
