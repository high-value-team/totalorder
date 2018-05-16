namespace to.backend.contract.dto
{
    public class CreateProjectRequestDto {
        public string Id;
        public string Title;
        public string ProductOwnerEmail;
        public string[] Items;

        public string SummaryPageUrlSchema;
        public string RearrangePageUrlSchema;
    }
}