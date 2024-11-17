using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using UpWork.Dtos;
using UpWork.Entities;
using UpWork.Services.Abstracts;
using UpWork_3.Server.Dtos;

namespace UpWork.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ApplicantController : ControllerBase
    {
        private readonly IApplicantService _applicantService;
        private readonly IMapper _mapper;
        private readonly UserManager<CustomIdentityUser> _userManager;
        private readonly SignInManager<CustomIdentityUser> _signInManager;
        private readonly RoleManager<CustomIdentityRole> _roleManager;
        private readonly IConfiguration _configuration;


        public ApplicantController(IApplicantService applicantService, IMapper mapper, UserManager<CustomIdentityUser> userManager, SignInManager<CustomIdentityUser> signInManager, RoleManager<CustomIdentityRole> roleManager, IConfiguration configuration)
        {
            _applicantService = applicantService;
            _mapper = mapper;
            _userManager = userManager;
            _signInManager = signInManager;
            _roleManager = roleManager;
            _configuration = configuration;
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

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(string id, ApplicantUpdateDTO dto)
        {
            var user = await _userManager.FindByIdAsync(id);

            if (user == null)
            {
                return NotFound(new { Message = "No user found with this id!" });
            }

            if (dto.Password != null && dto.Password != "")
            {
                var passwordHasher = new PasswordHasher<CustomIdentityUser>();
                user.PasswordHash = passwordHasher.HashPassword(user, dto.Password);
            }

            var userRoles = await _userManager.GetRolesAsync(user);

            // Əgər istifadəçi "Applicant" rolundadırsa, yalnız "Applicant"-a aid sahələri yenilə
            if (userRoles.Contains("Applicant"))
            {
                var applicant = user as Applicant; // CustomIdentityUser-i Applicant tipinə çevirməyə çalış

                if (applicant != null)
                {
                    applicant.About = dto.About ?? applicant.About;
                    applicant.Skills = dto.Skills ?? applicant.Skills;
                }
            }

            user.UserName = dto.UserName ?? user.UserName;
            user.BirthDate = dto.BirthDate ?? user.BirthDate;
            user.Email = dto.EmailAddress ?? user.Email;
            user.Country = dto.Country ?? user.Country;
            user.ImagePath = dto.ImagePath ?? user.ImagePath;

            var result = await _userManager.UpdateAsync(user);

            if (result.Succeeded)
            {

                var authClaims = new List<Claim>
                    {
                        new Claim(ClaimTypes.Name,user.UserName),
                        new Claim(JwtRegisteredClaimNames.Jti,Guid.NewGuid().ToString()),
                    };

                foreach (var role in userRoles)
                {
                    authClaims.Add(new Claim(ClaimTypes.Role, role));
                }

                await _signInManager.SignInAsync(user, isPersistent: false);
                var token = GetToken(authClaims);

                return Ok(new { Message = "User Updated Successfully ", Token = new JwtSecurityTokenHandler().WriteToken(token) });
            }


            return BadRequest(new { Message = "Something went wrong! " });
        }

        private SecurityToken GetToken(List<Claim> authClaims)
        {
            var authSignInKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Issuer"],
                expires: DateTime.Now.AddHours(3),
                claims: authClaims,
                signingCredentials: new SigningCredentials(authSignInKey, SecurityAlgorithms.HmacSha256)
                );

            return token;
        }
    }
}
