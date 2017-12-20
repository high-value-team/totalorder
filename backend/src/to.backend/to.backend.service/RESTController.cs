using System;
using System.Reflection;
using servicehost.contract;
using to.backend.adapters;
using to.backend.service.data;

namespace to.backend.service
{
    [Service]
    public class RESTControllerV1
    {
        [EntryPoint(HttpMethods.Post, "/api/v1/projects")]
        public string Create_project([Payload]CreateProjectRequest req)
        {
            var sampleItem = req.Items.Length > 0 ? req.Items[0] : "-";
            Console.WriteLine($"create project: {req.Title}, {req.ProductOwnerEmail}, {req.Items.Length} items, e.g. '{sampleItem}'");

            var id = Guid.NewGuid().ToString();
            return id;
        }


        [EntryPoint(HttpMethods.Get, "/api/v1/projects/{projectId}/summary")]
        public ProjectSummaryResponse Generate_project_summary(string projectId)
        {
            Console.WriteLine($"summary for {projectId}");

            return new ProjectSummaryResponse {
                Title = "Project " + projectId,
                NumberOfSubmissions = DateTime.Now.Second,
                Items = new[]{"item 2", "item 1", "item 3"}
            };
        }
        
        
        [EntryPoint(HttpMethods.Get, "/api/v1/projects/{projectId}/items")]
        public ItemsResponse Retrieve_project_items(string projectId)
        {
            Console.WriteLine($"items for {projectId}");

            return new ItemsResponse {
                Title = "Project " + projectId,
                Items = new[] {
                    new ItemsResponse.Item{Id = "a", Text = "Item 1"}, 
                    new ItemsResponse.Item{Id = "b", Text = "Item 2"},
                    new ItemsResponse.Item{Id = "c", Text = "Item 3"}
                }
            };
        }


        [EntryPoint(HttpMethods.Post, "/api/v1/projects/{projectId}/submissions")]
        public void Submit_ordered_items(string projectId, [Payload] TotalOrderSubmission req) {
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