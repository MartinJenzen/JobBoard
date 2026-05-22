using JobBoard.Api.Data;
using JobBoard.Api.DTOs;
using JobBoard.Api.Entities;
using Microsoft.EntityFrameworkCore;

namespace JobBoard.Api.Services;

public class JobService(AppDbContext dbContext) : IJobService
{
    public async Task<List<JobDto>> GetJobsAsync()
    {
        return await dbContext.Jobs // dbContext.Jobs accesses the Jobs DbSet, which represents the Jobs table in the database
            .Include(job => job.Company)
            .OrderBy(job => job.Id)
            .Select(job => ToDto(job)) // Projects each Job entity into a JobDto
            .ToListAsync();
    }

    public async Task<List<JobDto>> GetJobsAsync(int page, int perPage)
    {
        return await dbContext.Jobs
            .Include(job => job.Company)
            .OrderBy(job => job.Id)
            .Skip((page - 1) * perPage)
            .Take(perPage)
            .Select(job => ToDto(job))
            .ToListAsync();
    }

    public async Task<JobDto?> GetJobByIdAsync(int id)
    {
        var job = await dbContext.Jobs
            .Include(job => job.Company)
            .FirstOrDefaultAsync(job => job.Id == id);

        return job is null ? null : ToDto(job);
    }

    public async Task<JobDto> CreateJobAsync(CreateJobDto jobDto)
    {
        var company = new Company
        {
            Name = jobDto.Company.Name,
            Description = jobDto.Company.Description,
            ContactEmail = jobDto.Company.ContactEmail,
            ContactPhone = jobDto.Company.ContactPhone
        };

        var job = new Job
        {
            Title = jobDto.Title,
            Type = jobDto.Type,
            Description = jobDto.Description,
            Location = jobDto.Location,
            Salary = jobDto.Salary,
            Company = company
        };

        dbContext.Jobs.Add(job); // Adds the new Job entity to the Jobs DbSet, marking it for insertion into the database
        await dbContext.SaveChangesAsync();

        return ToDto(job);
    }

    public async Task<bool> UpdateJobAsync(int id, JobDto jobDto)
    {
        var job = await dbContext.Jobs
            .Include(job => job.Company)
            .FirstOrDefaultAsync(job => job.Id == id);

        if (job is null)
            return false;

        job.Title = jobDto.Title;
        job.Type = jobDto.Type;
        job.Description = jobDto.Description;
        job.Location = jobDto.Location;
        job.Salary = jobDto.Salary;

        job.Company.Name = jobDto.Company.Name;
        job.Company.Description = jobDto.Company.Description;
        job.Company.ContactEmail = jobDto.Company.ContactEmail;
        job.Company.ContactPhone = jobDto.Company.ContactPhone;

        await dbContext.SaveChangesAsync();

        return true;
    }

    public async Task<bool> DeleteJobAsync(int id)
    {
        var job = await dbContext.Jobs.FindAsync(id);

        if (job is null)
            return false;

        dbContext.Jobs.Remove(job);
        await dbContext.SaveChangesAsync();

        return true;
    }

    // Convert Job entity to JobDto
    private static JobDto ToDto(Job job)
    {
        return new JobDto
        {
            Id = job.Id,
            Title = job.Title,
            Type = job.Type,
            Description = job.Description,
            Location = job.Location,
            Salary = job.Salary,
            Company = new CompanyDto
            {
                Name = job.Company.Name,
                Description = job.Company.Description,
                ContactEmail = job.Company.ContactEmail,
                ContactPhone = job.Company.ContactPhone
            }
        };
    }
}