using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using UpWork.Dtos;
using UpWork.Entities;
using UpWork.Services.Abstracts;

namespace UpWork.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JobController : ControllerBase
    {
        private readonly IJobService _jobService;
        private readonly IMapper _mapper;

        public JobController(IJobService jobService, IMapper mapper)
        {
            _jobService = jobService;
            _mapper = mapper;
        }

        [Authorize(Roles = "Admin,Applicant,Advertiser")]
        [HttpGet]
        public async Task<List<JobDTO>> Get()
        {
            var jobs = await _jobService.GetAllJobs();
            var jobDTO = _mapper.Map<List<JobDTO>>(jobs);
            return jobDTO;
        }

        [Authorize(Roles = "Applicant,Advertiser")]
        [HttpGet("{tag}")]
        public async Task<List<JobDTO>> GetTag(string tags)
        {
            var tagArray = tags.Split(',');
            var jobs = await _jobService.GetJobByTags(tagArray.ToList());
            var jobDTO = _mapper.Map<List<JobDTO>>(jobs);

            return jobDTO;
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(string id)
        {
            var job = await _jobService.GetJobById(id);

            if (job != null)
            {
                var jobDTO = _mapper.Map<JobDTO>(job);
                return Ok(new { job = jobDTO });
            }

            return NotFound(new { Message = "No job with this id" });
        }

        [Authorize(Roles = "Advertiser")]
        [HttpGet("advertiserJob/{id}")]
        public async Task<IActionResult> GetAdvertiserJobs(string id)
        {
            var jobs = await _jobService.GetAllJobs();

            if (jobs != null)
            {
                var result = jobs.Where(j => j.AdvertiserId == id).ToList();
                var jobsDTO = _mapper.Map<List<JobDTO>>(result);

                return Ok(new { Jobs = jobsDTO });
            }

            return BadRequest("Jobs are empty");
        }

        [Authorize]
        [HttpGet("isDoneJobs/{id}")]
        public async Task<IActionResult> GetIsDoneJobs(string id)
        {
            var jobs = await _jobService.GetAllJobs();

            if (jobs != null)
            {
                var result = jobs.Where(j => j.AdvertiserId == id && j.IsDone == true).ToList();
                var jobsDTO = _mapper.Map<List<JobDTO>>(result);

                return Ok(new { Jobs = jobsDTO });
            }

            return BadRequest("Jobs are empty");
        }

        [Authorize(Roles = "Advertiser")]
        [HttpGet("isNotDoneJobs/{id}")]
        public async Task<IActionResult> GetIsNotDoneJobs(string id)
        {
            var jobs = await _jobService.GetAllJobs();

            if (jobs != null)
            {
                var result = jobs.Where(j => j.AdvertiserId == id && j.IsDone != true).ToList();
                var jobsDTO = _mapper.Map<List<JobDTO>>(result);

                return Ok(new { Jobs = jobsDTO });
            }

            return BadRequest("Jobs are empty");
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] JobDTO dto)
        {
            var job = _mapper.Map<Job>(dto);
            await _jobService.AddJob(job);
            return Ok(new { Message = "Job added successfully" });
        }

        [Authorize]
        [HttpPut]
        public async Task<IActionResult> Put(string id, [FromBody] JobDTO dto)
        {
            var job = await _jobService.GetJobById(id);
            if (job != null)
            {
                job.Price = dto.Price;
                job.IsDone = dto.IsDone;
                job.RequiredConnections = dto.RequiredConnections;
                job.Content = dto.Content;
                job.Tags = dto.Tags;
                job.ExperienceLevel = dto.ExperienceLevel;

                await _jobService.UpdateJob(job);
                return Ok(new { Message = "Job updated successfully" });
            }

            return NotFound(new { Message = "No job found with this id" });
        }

        [Authorize(Roles = "Advertiser,Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var job = await _jobService.GetJobById(id);

            if (job != null)
            {
                await _jobService.DeleteJob(job);
                return Ok(new { Message = "Job deleted successfully" });
            }

            return NotFound(new { Message = "No job found with this id" });
        }
    }
}
