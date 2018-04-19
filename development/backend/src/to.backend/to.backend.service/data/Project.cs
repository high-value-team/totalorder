namespace to.backend.service.data
{
    public class Project
    {
        public string Id;
        public string Title;
        public string ProductOwnerEmail;
        public string[] Items;
        public ItemOrder[] ItemOrders;

        public string SummaryPageUrl;
        public string RearrangePageUrl;
    }

    public class ItemOrder
    {
        public string StakeholderEmail;
        public string[] ItemIds;
    }
}