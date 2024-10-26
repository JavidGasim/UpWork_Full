using AutoMapper;
using UpWork.Dtos;
using UpWork.Entities;

namespace UpWork.AutoMappers
{
    public class Mapper : Profile
    {
        public Mapper()
        {
            CreateMap<CustomIdentityUser, UserDTO>().ReverseMap();
            CreateMap<Advertiser, AdvertiserDTO>().ReverseMap();
            CreateMap<Applicant, ApplicantDTO>().ReverseMap();
            CreateMap<Job, JobDTO>().ReverseMap();
            CreateMap<JobApplication, JobApplicationDTO>().ReverseMap();
        }
    }
}
