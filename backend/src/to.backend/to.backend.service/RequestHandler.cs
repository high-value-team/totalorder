using System.Collections.Generic;
using System.Linq;
using to.backend.contract;
using to.backend.contract.dto;
using to.backend.service.adapters;
using to.backend.service.data;

namespace to.backend.service
{
    public class RequestHandler : IRequestHandler
    {
        private readonly ProjectRepository _repo;
        private readonly IMailProvider _mail;

        public RequestHandler(ProjectRepository repo, IMailProvider mail) {
            _repo = repo;
            _mail = mail;
        }
        
        
        public string Create_project(CreateProjectRequestDto req) {
            var prj = new Project {
                Id = req.Id,
                Title = req.Title,
                ProductOwnerEmail = req.ProductOwnerEmail,
                Items = req.Items
            };
            var projectId = _repo.Create(prj);

            Send_project_creation_notification(projectId, prj.ProductOwnerEmail, prj.Title);
            
            return projectId;
        }



        public ProjectSummaryResponseDto Generate_project_summary(string projectId) {
            var prj = _repo.Load(projectId);
            var totalOrder = TotalOrder.Calculate(prj.ItemOrders.Select(io => io.ItemIds).ToArray());
            return new ProjectSummaryResponseDto {
                Title = prj.Title,
                Items = Map(prj.Items, totalOrder).ToArray(),
                NumberOfSubmissions = prj.ItemOrders.Length
            };

            IEnumerable<string> Map(string[] items, string[] order)
                => order.Length == 0 
                        ? items 
                        : order.Select(itemId => items[int.Parse(itemId)]);
        }
        

        public ItemsResponseDto Retrieve_project_items(string projectId) {
            var prj = _repo.Load(projectId);
            return new ItemsResponseDto {
                Title = prj.Title,
                ItemDtos = Map(prj.Items).ToArray()
            };

            IEnumerable<ItemsResponseDto.ItemDto> Map(IEnumerable<string> items)
                => items.Select((text, i) => new ItemsResponseDto.ItemDto {Id = i.ToString(), Text = text});
        }
        
        
        public void Submit_ordered_items(string projectId, TotalOrderSubmissionDto req) {
            _repo.Add_item_order_to_project(projectId, new ItemOrder{StakeholderEmail = req.StakeholderEmail, ItemIds = req.ItemIds});

            var prj = _repo.Load(projectId);
            Send_total_order_submission_notification(projectId, prj.ProductOwnerEmail, prj.Title);
        }

        
        private void Send_project_creation_notification(string projectId, string productOwnerEmail, string title) {
            _mail.Send_notification(productOwnerEmail, $"[TotalOrder] Project created successfully!", $"Title: {title}\nProject id: {projectId}");
        }
        
        private void Send_total_order_submission_notification(string projectId, string productOwnerEmail, string title) {
            _mail.Send_notification(productOwnerEmail, "[TotalOrder] Total order submitted to project!", $"Title: {title}\nProject id: {projectId}");
        }
    }
}