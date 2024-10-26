

namespace UpWork.Entities
{
    public class Advertiser : CustomIdentityUser
    {
        public List<Job>? Jobs { get; set; }
    }
}
