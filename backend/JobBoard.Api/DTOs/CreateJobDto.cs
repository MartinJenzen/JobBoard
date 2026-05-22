namespace JobBoard.Api.DTOs;

public class CreateJobDto
{
    public required string Title { get; set; }

    public required string Type { get; set; }

    public required string Description { get; set; }

    public required string Location { get; set; }

    public required string Salary { get; set; }

    public required CompanyDto Company { get; set; }
}