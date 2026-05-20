namespace JobBoard.Api.Entities;

public class Company
{
    public int Id { get; set; }

    public required string Name { get; set; }

    public required string Description { get; set; }

    public required string ContactPhone { get; set; }

    public required string ContactEmail { get; set; }

    // Navigation property (one-to-many relationship)
    public List<Job> Jobs { get; set; } = [];
}