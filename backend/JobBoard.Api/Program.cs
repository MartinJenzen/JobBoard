using JobBoard.Api.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

// Add services to the container.

// Configures the database provider (PostgreSQL) and connection string for the AppDbContext
builder.Services.AddDbContext<AppDbContext>(options => 
    options.UseNpgsql(connectionString));

builder.Services.AddControllers();

var app = builder.Build();

// Configure the HTTP request pipeline.

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
