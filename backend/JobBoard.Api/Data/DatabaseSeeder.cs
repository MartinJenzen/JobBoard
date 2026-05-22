using System.Text.Json;
using JobBoard.Api.Entities;
using Microsoft.EntityFrameworkCore;

namespace JobBoard.Api.Data;

public static class DatabaseSeeder
{
    private static readonly JsonSerializerOptions JsonOptions = new()
    {
        // Allow mapping of properties from JSON file to match DTOs with different capitalization (e.g., "title" -> "Title"))
        PropertyNameCaseInsensitive = true
    };
    
    public static async Task SeedAsync(WebApplication app)
    {
        // Enable access to scoped services like AppDbContext
        using var scope = app.Services.CreateScope();

        var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();

        if (await dbContext.Jobs.AnyAsync())
            return; // Database has already been seeded

        var seedFilePath = Path.Combine(
            app.Environment.ContentRootPath,
            "Data",
            "Seed",
            "jobs.seed.json"
        );

        var jobsJson = await File.ReadAllTextAsync(seedFilePath);

        var seedData = JsonSerializer.Deserialize<JobSeedData>(jobsJson, JsonOptions);

        if (seedData is null)
            return;

        // Map seed data to Job entities
        var jobs = seedData.Jobs.Select(job => new Job
        {
            Title = job.Title,
            Type = job.Type,
            Description = job.Description,
            Location = job.Location,
            Salary = job.Salary,
            Company = new Company
            {
                Name = job.Company.Name,
                Description = job.Company.Description,
                ContactEmail = job.Company.ContactEmail,
                ContactPhone = job.Company.ContactPhone
            }
        });

        dbContext.Jobs.AddRange(jobs);

        await dbContext.SaveChangesAsync();
    }

    private sealed class JobSeedData
    {
        public List<JobSeedItem> Jobs { get; set; } = [];
    }

    private sealed class JobSeedItem
    {
        public required string Title { get; set; }
        public required string Type { get; set; }
        public required string Description { get; set; }
        public required string Location { get; set; }
        public required string Salary { get; set; }
        public required CompanySeedItem Company { get; set; }
    }

    private sealed class CompanySeedItem
    {
        public required string Name { get; set; }
        public required string Description { get; set; }
        public required string ContactEmail { get; set; }
        public required string ContactPhone { get; set; }
    }
}