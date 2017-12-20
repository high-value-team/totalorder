namespace to.backend.service.data
{
    public class CreateProjectRequest {
        public string Title;
        public string ProductOwnerEmail;
        public string[] Items;
    }
    
    
    public class ProjectSummaryResponse {
        public string Title;
        public int NumberOfSubmissions;
        public string[] Items;
    }


    public class ItemsResponse
    {
        public class Item
        {
            public string Id;
            public string Text;
        }
        
        public string Title;
        public ItemsResponse.Item[] Items;
    }


    public class TotalOrderSubmission
    {
        public string StakeholderEmail;
        public string[] ItemIds;
    }
}