using UpWork.Entities;

namespace UpWork.Services.Abstracts
{
    public interface IJobService
    {
        Task<List<Job>> GetAllJobs();
        Task<Job> GetJobById(string id);
        Task<List<Job>> GetJobByTags(List<string> tags);
        Task AddJob(Job job);
        Task DeleteJob(Job job);
        Task UpdateJob(Job job);
    }
}
