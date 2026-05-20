namespace JobBoard.Api.Entities;

public class Job
{
    public int Id { get; set; }

    public required string Title { get; set; }

    public required string Type { get; set; }

    public required string Description { get; set; }

    public required string Location { get; set; }

    public required string Salary { get; set; }

    // Foreign key
    public int CompanyId { get; set; }

    // Navigation property (many-to-one relationship)
    public required Company Company { get; set; }
}