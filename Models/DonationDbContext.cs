using Microsoft.EntityFrameworkCore;
using React_Core_Demo.Models;
using Microsoft.Extensions.Options;

namespace React_Core_Demo.Data
{
    public class DonationDbContext : DbContext
    {
        public DonationDbContext(DbContextOptions<DonationDbContext> options) : base(options)
        {
        }

        public DbSet<DonationCandidate> DonationCandidates { get; set; }
    }
}