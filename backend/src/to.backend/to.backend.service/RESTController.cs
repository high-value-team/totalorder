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
            Console.WriteLine($"create project: {req.Title}, {req.Owner}, {req.Items.Length} items, e.g. '{sampleItem}'");

            var id = Guid.NewGuid().ToString();
            return id;
        }


        [EntryPoint(HttpMethods.Get, "/api/v1/projects/{projectId}/summary")]
        public ProjectSummaryResponse Summary(string projectId)
        {
            Console.WriteLine($"summary for {projectId}");

            return new ProjectSummaryResponse {
                Title = "Project " + projectId,
                NumberOfSubmissions = DateTime.Now.Second,
                Items = new[]{"item 2", "item 1", "item 3"}
            };
        }
        
        
        [EntryPoint(HttpMethods.Get, "/api/v1/version")]
        public string Version() {
            var version = Assembly.GetExecutingAssembly().GetName().Version.ToString();
            return $"{DateTime.Now}: TotalOrder Version {version}, dbPath: {Config.DbPath}";
        }
    }
}