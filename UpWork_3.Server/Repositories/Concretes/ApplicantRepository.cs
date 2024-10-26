using Microsoft.EntityFrameworkCore;
using UpWork.Data;
using UpWork.Entities;
using UpWork.Repositories.Abstracts;

namespace UpWork.Repositories.Concretes
{
    public class ApplicantRepository : IApplicantRepository
    {
        private readonly UpWorkDb _context;

        public ApplicantRepository(UpWorkDb context)
        {
            _context = context;
        }

        public async Task AddApplicant(Applicant applicant)
        {
            await _context.Applicants.AddAsync(applicant);
        }

        public async Task<List<Applicant>> GetApplicantBySkills(List<string> skills)
        {
            var applicants = _context.Applicants.ToList();
            List<Applicant> result = new List<Applicant>();

            foreach (var applicant in applicants)
            {
                if (skills.All(item => applicant.Skills.Contains(item)))
                {
                    result.Add(applicant);
                }
            }

            return result;
        }
        public async Task DeleteApplicant(Applicant applicant)
        {
            await Task.Run(async () =>
            {
                _context.Applicants.Remove(applicant);
            });

            await _context.SaveChangesAsync();
        }

        public async Task<Applicant> GetApplicantById(string id)
        {
            return await _context.Applicants.FirstOrDefaultAsync(a => a.Id == id);
        }

        public async Task<List<Applicant>> GetAllApplicant()
        {
            return await _context.Applicants.ToListAsync();
        }

        public async Task UpdateApplicant(Applicant applicant)
        {
            await Task.Run(() =>
            {
                _context.Applicants.Update(applicant);
            });

            await _context.SaveChangesAsync();
        }
    }
}
