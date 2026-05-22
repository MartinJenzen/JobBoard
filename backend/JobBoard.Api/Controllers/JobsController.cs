using JobBoard.Api.DTOs;
using JobBoard.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace JobBoard.Api.Controllers;

[ApiController] // Enables API-specific behaviors and features
[Route("jobs")] // Base route for all job-related endpoints

public class JobsController(IJobService jobService) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetJobs( // IACtionResult is the return type that allows for different types of HTTP responses (e.g., Ok, NotFound, BadRequest)
        [FromQuery(Name = "_page")] int? page,
        [FromQuery(Name = "_per_page")] int? perPage)
    {
        if (page.HasValue && perPage.HasValue)
        {
            if (page <= 0 || perPage <= 0)
                return BadRequest("Page and per page values must be greater than 0!");

            var pagedJobs = await jobService.GetJobsAsync(page.Value, perPage.Value); // .value is needed because page and perPage are nullable types (int?)

            return Ok(pagedJobs);
        }

        var jobs = await jobService.GetJobsAsync();

        return Ok(jobs);
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetJobById(int id)
    {
        var job = await jobService.GetJobByIdAsync(id);

        if (job is null)
            return NotFound();

        return Ok(job);
    }

    [HttpPost]
    public async Task<IActionResult> CreateJob(CreateJobDto jobDto)
    {
        var createdJob = await jobService.CreateJobAsync(jobDto);

        if (createdJob is null)
            return BadRequest();

        return CreatedAtAction(
            nameof(GetJobById),         // Specifies the method to use for generating the URL of the newly created resource
            new { id = createdJob.Id }, // Route values for the GetJobById method, using the ID of the newly created job
            createdJob
        );
    }

    [HttpPut("{id:int}")]
    public async Task <IActionResult> UpdateJob(int id, JobDto jobDto)
    {
        var updatedJob = await jobService.UpdateJobAsync(id, jobDto);

        if (!updatedJob)
            return NotFound();

        return NoContent();
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteJob(int id)
    {
        var deletedJob = await jobService.DeleteJobAsync(id);

        if (!deletedJob)
            return NotFound();

        return NoContent();
    }
}