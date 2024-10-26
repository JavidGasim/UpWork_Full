using UpWork.Entities;
using UpWork.Repositories.Abstracts;
using UpWork.Services.Abstracts;

namespace UpWork.Services.Concretes
{
    public class JobApplicationService : IJobApplicationService
    {
        private readonly IJobApplicationRepository _jobApplicationRepository;

        public JobApplicationService(IJobApplicationRepository jobApplicationRepository)
        {
            _jobApplicationRepository = jobApplicationRepository;
        }

        public async Task Add(JobApplication jobApplication)
        {
            await _jobApplicationRepository.Add(jobApplication);
        }

        public async Task Delete(JobApplication jobApplication)
        {
            await _jobApplicationRepository.Delete(jobApplication);
        }

        public async Task<List<JobApplication>> GetAllJobApplications()
        {
            return await _jobApplicationRepository.GetAllJobApplications();
        }

        public async Task<JobApplication> GetJobApplicationById(string id)
        {
            return await _jobApplicationRepository.GetJobApplicationById(id);
        }

        public async Task Update(JobApplication jobApplication)
        {
             await _jobApplicationRepository.Update(jobApplication);
        }
    }
}
