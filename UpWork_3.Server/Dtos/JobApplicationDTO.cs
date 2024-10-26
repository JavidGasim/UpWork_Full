using UpWork.Entities;

namespace UpWork.Dtos
{
    public class JobApplicationDTO
    {
        public string? Id { get; set; }
        public string? JobId { get; set; }
        public Job? Job { get; set; }
        public string? ApplicantId { get; set; }
        public Applicant? Applicant { get; set; }
    }
}
