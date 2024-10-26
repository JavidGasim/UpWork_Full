using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using UpWork.Dtos;
using UpWork.Services.Abstracts;

namespace UpWork.Controllers
{
    [Authorize(Roles = "Admin")]
    [Route("api/[controller]")]
    [ApiController]
    public class AdvertiserController : ControllerBase
    {
        private readonly IAdvertiserService _advertiserService;
        private readonly IMapper _mapper;

        public AdvertiserController(IAdvertiserService advertiserService, IMapper mapper)
        {
            _advertiserService = advertiserService;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<List<AdvertiserDTO>> Get()
        {
            var users = await _advertiserService.GetAllAdvertiser();
            var usersDto = _mapper.Map<List<AdvertiserDTO>>(users);

            return usersDto;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(string id)
        {
            var user = await _advertiserService.GetAdvertiserById(id);

            if (user != null)
            {
                var userDto = _mapper.Map<AdvertiserDTO>(user);
                return Ok(userDto);
            }

            return NotFound(new { Message = "No user found with given ID" });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var user = await _advertiserService.GetAdvertiserById(id);

            if (user != null)
            {
                await _advertiserService.DeleteAdvertiser(user);
                return Ok(new { Message = "Applicant Deleted Successfully" });
            }

            return NotFound(new { Message = "No user found with this Id" });
        }
    }
}
