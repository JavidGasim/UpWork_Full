using UpWork.Entities;
using UpWork.Repositories.Abstracts;
using UpWork.Services.Abstracts;

namespace UpWork.Services.Concretes
{
    public class JobService : IJobService
    {
        public readonly IJobRepository _jobRepository;

        public JobService(IJobRepository jobRepository)
        {
            _jobRepository = jobRepository;
        }

        public async Task AddJob(Job job)
        {
            await _jobRepository.AddJob(job);
        }

        public async Task DeleteJob(Job job)
        {
            await _jobRepository.DeleteJob(job);
        }

        public async Task<List<Job>> GetAllJobs()
        {
            return await _jobRepository.GetAllJobs();
        }

        public async Task<Job> GetJobById(string id)
        {
            return await _jobRepository.GetJobById(id);
        }

        public Task<List<Job>> GetJobByTags(List<string> tags)
        {
            return _jobRepository.GetJobByTags(tags);
        }

        public async Task UpdateJob(Job job)
        {
            await _jobRepository.UpdateJob(job);
        }
    }
}
