using UpWork.Entities;
using UpWork.Repositories.Abstracts;
using UpWork.Services.Abstracts;

namespace UpWork.Services.Concretes
{
    public class ApplicantService : IApplicantService
    {
        private readonly IApplicantRepository _applicantrepository;

        public ApplicantService(IApplicantRepository applicantrepository)
        {
            _applicantrepository = applicantrepository;
        }

        public async Task AddApplicant(Applicant applicant)
        {
            await _applicantrepository.AddApplicant(applicant);
        }

        public async Task<List<Applicant>> GetApplicantBySkills(List<string> skills)
        {
            return await _applicantrepository.GetApplicantBySkills(skills);
        }

        public async Task DeleteApplicant(Applicant applicant)
        {
            await _applicantrepository.DeleteApplicant(applicant);
        }

        public async Task<Applicant> GetApplicantById(string id)
        {
            return await _applicantrepository.GetApplicantById(id);
        }

        public async Task<List<Applicant>> GetAllApplicant()
        {
            return await _applicantrepository.GetAllApplicant();
        }

        public async Task UpdateApplicant(Applicant applicant)
        {
            await _applicantrepository.UpdateApplicant(applicant);
        }
    }
}
