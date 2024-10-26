using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using UpWork.Entities;

namespace UpWork.Data
{
    public class UpWorkDb : IdentityDbContext<CustomIdentityUser, CustomIdentityRole, string>
    {
        public UpWorkDb(DbContextOptions<UpWorkDb> options) : base(options)
        {
        }

        public DbSet<Job> Jobs { get; set; }
        public DbSet<Applicant> Applicants { get; set; }
        public DbSet<Advertiser> Advertisers { get; set; }
        public DbSet<JobApplication> JobApplications { get; set; }
    }
}
