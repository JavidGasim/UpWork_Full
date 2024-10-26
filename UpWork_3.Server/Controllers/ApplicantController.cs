using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using UpWork.Dtos;
using UpWork.Entities;
using UpWork.Services.Abstracts;

namespace UpWork.Controllers
{
    [Authorize(Roles = "Admin")]
    [Route("api/[controller]")]
    [ApiController]
    public class ApplicantController : ControllerBase
    {
        private readonly IApplicantService _applicantService;
        private readonly IMapper _mapper;

        public ApplicantController(IApplicantService applicantService, IMapper mapper)
        {
            _applicantService = applicantService;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<List<ApplicantDTO>> Get()
        {
            var users = await _applicantService.GetAllApplicant();
            var usersDto = _mapper.Map<List<ApplicantDTO>>(users);

            return usersDto;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(string id)
        {
            var user = await _applicantService.GetApplicantById(id);

            if (user != null)
            {
                var userDto = _mapper.Map<ApplicantDTO>(user);
                return Ok(userDto);
            }

            return NotFound(new { Message = "No user found with given ID" });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var user = await _applicantService.GetApplicantById(id);

            if (user != null)
            {
                await _applicantService.DeleteApplicant(user);
                return Ok(new { Message = "Applicant Deleted Successfully" });
            }

            return NotFound(new { Message = "No user found with this Id" });
        }
    }
}
