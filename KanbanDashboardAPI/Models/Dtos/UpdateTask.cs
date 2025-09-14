namespace KanbanDashboardAPI.Models.Dtos
{
    public class UpdateTask
    {
        public required string Title { get; set; }
        public string? Description { get; set; }
        public required string Status { get; set; }
    }
}
