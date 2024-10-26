using UpWork.Entities;

namespace UpWork.Repositories.Abstracts
{
    public interface IJobApplicationRepository
    {
        Task<List<JobApplication>> GetAllJobApplications();
        Task<JobApplication> GetJobApplicationById(string id);
        Task Add(JobApplication jobApplication);    
        Task Update(JobApplication jobApplication);
        Task Delete(JobApplication jobApplication);
    }
}
