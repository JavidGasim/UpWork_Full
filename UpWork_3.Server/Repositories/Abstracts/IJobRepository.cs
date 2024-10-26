using UpWork.Entities;

namespace UpWork.Repositories.Abstracts
{
    public interface IJobRepository
    {
        Task<List<Job>> GetAllJobs();
        Task<Job> GetJobById(string id);   
        Task<List<Job>> GetJobByTags(List<string> tags);
        Task AddJob (Job job);
        Task DeleteJob (Job job);
        Task UpdateJob (Job job);
    }
}
