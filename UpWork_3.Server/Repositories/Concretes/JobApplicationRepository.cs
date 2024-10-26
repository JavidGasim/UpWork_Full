using Microsoft.EntityFrameworkCore;
using UpWork.Data;
using UpWork.Entities;
using UpWork.Repositories.Abstracts;

namespace UpWork.Repositories.Concretes
{
    public class JobApplicationRepository : IJobApplicationRepository
    {
        private readonly UpWorkDb _context;

        public JobApplicationRepository(UpWorkDb context)
        {
            _context = context;
        }

        public async Task Add(JobApplication jobApplication)
        {
            await _context.JobApplications.AddAsync(jobApplication);
            await _context.SaveChangesAsync();
        }

        public async Task Delete(JobApplication jobApplication)
        {
            await Task.Run(() =>
            {
                _context.JobApplications.Remove(jobApplication);
            });
            await _context.SaveChangesAsync();
        }

        public async Task<List<JobApplication>> GetAllJobApplications()
        {
            return await _context.JobApplications.ToListAsync();
        }

        public async Task<JobApplication> GetJobApplicationById(string id)
        {
            return await _context.JobApplications.FirstOrDefaultAsync(j => j.Id == id);
        }

        public async Task Update(JobApplication jobApplication)
        {
            await Task.Run(() =>
            {
                _context.JobApplications.Update(jobApplication);    
            });
            await _context.SaveChangesAsync();  
        }
    }
}
