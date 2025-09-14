using KanbanDashboardAPI.Data;
using KanbanDashboardAPI.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Enable CORS for React frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReact", policy =>
    {
        policy.WithOrigins("http://localhost:5173") // React dev server
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Use SQLite connection
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();

// Auto-create SQLite database and tables if it doesn't exist
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.EnsureCreated();

    // Pre-pump mock data if db is empty
    if (!db.Tasks.Any())
    {
        db.Tasks.AddRange(
            new TaskItem { Title = "Sample Task 1", Description = "This is a sample task", Status = "To Do", CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
            new TaskItem { Title = "Sample Task 2", Description = "Another sample task", Status = "In Progress", CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
            new TaskItem { Title = "Sample Task 3", Description = "Completed task example", Status = "Done", CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow }
        );
        db.SaveChanges();
    }
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowReact");

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();
