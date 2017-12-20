namespace to.backend.service.data
{
    public class CreateProjectRequest {
        public string Title;
        public string Owner;
        public string[] Items;
    }
    
    
    public class ProjectSummaryResponse {
        public string Title;
        public int NumberOfSubmissions;
        public string[] Items;
    }
}