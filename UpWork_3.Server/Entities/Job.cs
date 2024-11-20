using System.ComponentModel.DataAnnotations;

namespace UpWork.Entities
{
    public class Job
    {
        public string? Id { get; set; }
        public string? AdvertiserId { get; set; }
        public Advertiser? Advertiser { get; set; }
        public string? JobTitle { get; set; }
        [DataType(DataType.Text)]
        public string? Content { get; set; }
        public bool IsDone { get; set; }
        public int RequiredConnections { get; set; }
        public string? ExperienceLevel { get; set; }
        public List<string>? Tags { get; set; }
        public string? Price { get; set; }
    }
}
