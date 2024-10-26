namespace UpWork.Entities
{
    public class JobApplication
    {
        public string? Id { get; set; }
        public string? JobId { get; set; }
        public Job? Job { get; set; }
        public string? ApplicantId { get; set; }
        public Applicant? Applicant { get; set; }
    }
}
