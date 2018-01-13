using to.backend.contract;
using to.backend.service.adapters;

namespace to.backend.service
{
    public class RequestHandler : IRequestHandler
    {
        private readonly ProjectRepository _repo;

        public RequestHandler(ProjectRepository repo) {
            _repo = repo;
        }
        
        
        public string Create_project(string title, string productOwnerEmail, string[] items) {
            var prj = new Project {
                Title = title,
                ProductOwnerEmail = productOwnerEmail,
                Items = items
            };
            return _repo.Create(prj);
        }
        
        //public ProjectSummaryResponseDto Generate_project_summary(string projectId)
        
        //public ItemsResponseDto Retrieve_project_items(string projectId)
        
        //public void Submit_ordered_items(string projectId, [Payload] TotalOrderSubmissionDto req)
    }
}