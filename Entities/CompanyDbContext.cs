using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace EmployersRecord.Entities
{
    public class CompanyDbContext : IdentityDbContext<User, IdentityRole<int>, int>
    {
        public CompanyDbContext(DbContextOptions<CompanyDbContext> options)
            : base(options)
        {
        }
        public DbSet<Application> Applications { get; }
        public DbSet<Report> Reports { get; }

        // protected override void OnModelCreating(ModelBuilder builder)
        // {
        //     base.OnModelCreating(builder);

        //     builder.Entity<User>().Property(p => p.Id).UseIdentityColumn();
        // }
    }
}