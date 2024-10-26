using Microsoft.EntityFrameworkCore;
using UpWork.Data;
using UpWork.Entities;
using UpWork.Repositories.Abstracts;

namespace UpWork.Repositories.Concretes
{
    public class JobRepository : IJobRepository
    {
        private readonly UpWorkDb _context;

        public JobRepository(UpWorkDb context)
        {
            _context = context;
        }

        public async Task<List<Job>> GetAllJobs()
        {
            return await _context.Jobs.ToListAsync();
        }

        public async Task AddJob(Job job)
        {
            await _context.Jobs.AddAsync(job);
        }

        public async Task DeleteJob(Job job)
        {
            await Task.Run(() =>
            {
                _context.Jobs.Remove(job);
            });

            await _context.SaveChangesAsync();
        }

        public async Task<Job> GetJobById(string id)
        {
            return await _context.Jobs.FirstOrDefaultAsync(j => j.Id == id);
        }

        public async Task<List<Job>> GetJobByTags(List<string> tags)
        {
            var jobs = await _context.Jobs.ToListAsync();
            List<Job> result = new List<Job>();

            foreach (var job in jobs)
            {
                if (tags.All(item => job.Tags.Contains(item)))
                {
                    result.Add(job);
                }
            }

            return result;
        }

        public async Task UpdateJob(Job job)
        {
            await Task.Run(() =>
            {
                _context.Jobs.AddAsync(job);
            });

            await _context.SaveChangesAsync();
        }
    }
}
