using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization.Formatters;
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
            var projectId = Create_project_id();
            var prj = new Project
            {
                Id = projectId,
                Title = req.Title,
                ProductOwnerEmail = req.ProductOwnerEmail,
                Items = req.Items,
                SummaryPageUrl = Replace_in_url_schema("{projectId}", req.SummaryPageUrlSchema, projectId),
                RearrangePageUrl = Replace_in_url_schema("{projectId}", req.RearrangePageUrlSchema, projectId)
            };
            _repo.Create(prj);

            Send_project_creation_notification(prj);

            return projectId;


            string Create_project_id()
                => string.IsNullOrEmpty(req.Id)
                    ? Guid.NewGuid().ToString()
                    : req.Id;

            string Replace_in_url_schema(string pattern, string urlSchema, string value)
                => urlSchema.ToLower().Replace(pattern.ToLower(), value);
        }



        public ProjectSummaryResponseDto Generate_project_summary(string projectId) {
            var prj = _repo.Load(projectId);
            var totalOrder = TotalOrder.Calculate(prj.ItemOrders.Select(io => io.ItemIds).ToArray());
            return new ProjectSummaryResponseDto
            {
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
                Items = Map(prj.Items).ToArray()
            };

            IEnumerable<ItemsResponseDto.ItemDto> Map(IEnumerable<string> items)
                => items.Select((text, i) => new ItemsResponseDto.ItemDto {Id = i.ToString(), Text = text});
        }


        public void Submit_ordered_items(string projectId, TotalOrderSubmissionDto req) {
            _repo.Add_item_order_to_project(projectId,
                new ItemOrder {StakeholderEmail = req.StakeholderEmail, ItemIds = req.ItemIds});

            var prj = _repo.Load(projectId);
            Send_total_order_submission_notification(prj);
        }


        private void Send_project_creation_notification(Project project) {
            var author = new MailAuthor(project);
            _mail.Send_notification(project.ProductOwnerEmail, 
                                    $"[TotalOrder] Project created successfully!", 
                                    author.Project_created_message);
        }

        private void Send_total_order_submission_notification(Project project) {
            var author = new MailAuthor(project);
            _mail.Send_notification(project.ProductOwnerEmail,
                                    $"[TotalOrder] Total order submitted for project '{project.Title}'",
                                    author.Total_order_submitted_message);
        }
    }
}