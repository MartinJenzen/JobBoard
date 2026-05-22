using JobBoard.Api.Data;
using Microsoft.EntityFrameworkCore;
using JobBoard.Api.Services;

var builder = WebApplication.CreateBuilder(args);
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

// Add services to the container.

// Configure database provider (PostgreSQL) and connection string for AppDbContext
builder.Services.AddDbContext<AppDbContext>(options => 
    options.UseNpgsql(connectionString));

// Register JobService as the implementation of IJobService in the dependency injection container
builder.Services.AddScoped<IJobService, JobService>();

builder.Services.AddControllers();

var app = builder.Build();

await DatabaseSeeder.SeedAsync(app);

// Configure the HTTP request pipeline.

// app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
