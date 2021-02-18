using Capstone_Nucleus.Models;
using Microsoft.EntityFrameworkCore;

namespace Capstone_Nucleus.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<Item> Item { get; set; }

        public DbSet<UserProfile> UserProfile { get; set; }

        public DbSet<UserType> UserType { get; set; }

        public DbSet<Department> Department { get; set; }
    }
}