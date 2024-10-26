using UpWork.Entities;

namespace UpWork.Services.Abstracts
{
    public interface IJobApplicationService
    {
        Task<List<JobApplication>> GetAllJobApplications();
        Task<JobApplication> GetJobApplicationById(string id);
        Task Add(JobApplication jobApplication);
        Task Update(JobApplication jobApplication);
        Task Delete(JobApplication jobApplication);
    }
}
