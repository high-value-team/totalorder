namespace to.backend.service
{
    public class Project
    {
        public string Id;
        public string Title;
        public string ProductOwnerEmail;
        public string[] Items;
        public ItemOrder[] ItemOrders;
    }

    public class ItemOrder
    {
        public string SubmissionEmail;
        public string[] ItemIds;
    }
}