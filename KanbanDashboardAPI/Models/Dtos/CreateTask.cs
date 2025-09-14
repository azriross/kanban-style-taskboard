namespace KanbanDashboardAPI.Models.Dtos
{
    public class CreateTask
    {
        public required string Title { get; set; }
        public string? Description { get; set; }
        public required string Status { get; set; }
    }
}
