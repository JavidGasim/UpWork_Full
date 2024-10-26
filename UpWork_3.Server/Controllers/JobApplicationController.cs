using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using UpWork.Dtos;
using UpWork.Entities;
using UpWork.Services.Abstracts;

namespace UpWork.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JobApplicationController : ControllerBase
    {
        private readonly IJobApplicationService _jobApplicationService;
        private readonly IMapper _mapper;

        public JobApplicationController(IJobApplicationService jobApplicationService, IMapper mapper)
        {
            _jobApplicationService = jobApplicationService;
            _mapper = mapper;
        }

        [Authorize(Roles = "Admin")]
        [HttpGet]
        public async Task<List<JobApplicationDTO>> Get()
        {
            var applications = await _jobApplicationService.GetAllJobApplications();
            var appDTO = _mapper.Map<List<JobApplicationDTO>>(applications);

            return appDTO;
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var application = await _jobApplicationService.GetJobApplicationById(id);

            if (application != null)
            {
                await _jobApplicationService.Delete(application);
                return Ok(new { Message = "Application Deleted Successfully" });
            }

            return NotFound(new { Message = "No Application with this id" });
        }

        [Authorize(Roles = "Applicant")]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetJobApplications(string id)
        {
            var applications = await _jobApplicationService.GetAllJobApplications();
            if (applications != null)
            {
                var result = applications.FirstOrDefault(a => a.ApplicantId == id);
                var applicationDTO = _mapper.Map<List<JobApplicationDTO>>(result);

                return Ok(new { Applications = applicationDTO });
            }

            return NotFound(new { Message = "Applications are empty" });
        }

        [Authorize(Roles = "Applicant")]
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] JobApplicationDTO dto)
        {
            var application = _mapper.Map<JobApplication>(dto);
            await _jobApplicationService.Add(application);
            return Ok(new { Message = "Application added successfully" });
        }
    }
}
