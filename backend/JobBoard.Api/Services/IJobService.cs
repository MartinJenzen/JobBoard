using JobBoard.Api.DTOs;

namespace JobBoard.Api.Services;

public interface IJobService
{
    // Task<> enables asynchronicity
    Task<List<JobDto>> GetJobsAsync();

    Task<List<JobDto>> GetJobsAsync(int page, int perPage);

    // ? means the return value can be null
    Task<JobDto?> GetJobByIdAsync(int id);

    Task<JobDto> CreateJobAsync(CreateJobDto jobDto);

    Task<bool> UpdateJobAsync(int id, JobDto jobDto);

    Task<bool> DeleteJobAsync(int id);
}