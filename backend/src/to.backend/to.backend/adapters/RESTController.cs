using System;
using System.Reflection;
using servicehost.contract;
using to.backend.contract;
using to.backend.dto;

namespace to.backend.adapters
{
    [Service]
    public class RESTControllerV1
    {
        public static Func<IRequestHandler> __RequestHandler;
        
        
        [EntryPoint(HttpMethods.Post, "/api/v1/projects")]
        public string Create_project([Payload]CreateProjectRequestDto req) {
            Console.WriteLine($"create project: {req.Title}, {req.ProductOwnerEmail}, {req.Items.Length} items");

            return __RequestHandler().Create_project(req.Title, req.ProductOwnerEmail, req.Items);
        }


        [EntryPoint(HttpMethods.Get, "/api/v1/projects/{projectId}/summary")]
        public ProjectSummaryResponseDto Generate_project_summary(string projectId)
        {
            Console.WriteLine($"summary for {projectId}");

            return new ProjectSummaryResponseDto {
                Title = "Project " + projectId,
                NumberOfSubmissions = DateTime.Now.Second,
                Items = new[]{"item 2", "item 1", "item 3"}
            };
        }
        
        
        [EntryPoint(HttpMethods.Get, "/api/v1/projects/{projectId}/items")]
        public ItemsResponseDto Retrieve_project_items(string projectId)
        {
            Console.WriteLine($"items for {projectId}");

            return new ItemsResponseDto {
                Title = "Project " + projectId,
                ItemsDto = new[] {
                    new ItemsResponseDto.ItemDto{Id = "a", Text = "Item 1"}, 
                    new ItemsResponseDto.ItemDto{Id = "b", Text = "Item 2"},
                    new ItemsResponseDto.ItemDto{Id = "c", Text = "Item 3"}
                }
            };
        }


        [EntryPoint(HttpMethods.Post, "/api/v1/projects/{projectId}/submissions")]
        public void Submit_ordered_items(string projectId, [Payload] TotalOrderSubmissionDto req) {
            var ids = string.Join(",", req.ItemIds);
            Console.WriteLine($"submission: {req.StakeholderEmail}, {ids}");
        }
        
        
        [EntryPoint(HttpMethods.Get, "/api/v1/version")]
        public string Version() {
            var version = Assembly.GetExecutingAssembly().GetName().Version.ToString();
            return $"{DateTime.Now}: TotalOrder Version {version}, dbPath: {Config.DbPath}";
        }
    }
}