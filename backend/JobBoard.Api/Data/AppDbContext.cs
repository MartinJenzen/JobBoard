using JobBoard.Api.Entities;
using Microsoft.EntityFrameworkCore;

namespace JobBoard.Api.Data;

// Database session used by EF Core
public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    // Access to the Jobs table
    public DbSet<Job> Jobs => Set<Job>();

    // Access to the Companies table
    public DbSet<Company> Companies => Set<Company>();

    // Configuration of database rules for entity classes
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Company entity configuration
        modelBuilder.Entity<Company>(entity =>
        {
            entity.Property(company => company.Name)
                .HasMaxLength(200)
                .IsRequired();

            entity.Property(company => company.Description)
                .HasMaxLength(2000)
                .IsRequired();

            entity.Property(company => company.ContactEmail)
                .HasMaxLength(320)
                .IsRequired();

            entity.Property(company => company.ContactPhone)
                .HasMaxLength(50)
                .IsRequired();
        });

        // Job entity configuration
        modelBuilder.Entity<Job>(entity =>
        {
            entity.Property(job => job.Title)
                .HasMaxLength(200)
                .IsRequired();

            entity.Property(job => job.Type)
                .HasMaxLength(100)
                .IsRequired();

            entity.Property(job => job.Description)
                .HasMaxLength(4000)
                .IsRequired();

            entity.Property(job => job.Location)
                .HasMaxLength(200)
                .IsRequired();

            entity.Property(job => job.Salary)
                .HasMaxLength(100)
                .IsRequired();

            entity.HasOne(job => job.Company)
                .WithMany(company => company.Jobs)
                .HasForeignKey(job => job.CompanyId)
                .OnDelete(DeleteBehavior.Restrict);
        });
    }
}
