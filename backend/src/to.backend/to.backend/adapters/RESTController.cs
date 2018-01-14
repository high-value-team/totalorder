using System;
using System.Reflection;
using servicehost.contract;
using to.backend.contract;
using to.backend.contract.dto;

namespace to.backend.adapters
{
    /*
     * Responsible for communication:
     *     - routing requests
     *     - (de)serialization of DTOs
     *
     * Incidentally there's not much to do due to the high level of abstraction the servicehost provides.
     */
    [Service]
    public class RESTControllerV1
    {
        public static Func<IRequestHandler> __RequestHandler;
        
        
        [EntryPoint(HttpMethods.Post, "/api/v1/projects")]
        public string Create_project([Payload]CreateProjectRequestDto req) {
            Console.WriteLine($"create project:{req.Id}:{req.Title}, {req.ProductOwnerEmail}, {req.Items.Length} items");

            return __RequestHandler().Create_project(req);
        }


        [EntryPoint(HttpMethods.Get, "/api/v1/projects/{projectId}/summary")]
        public ProjectSummaryResponseDto Generate_project_summary(string projectId) {
            Console.WriteLine($"summary for {projectId}");

            return __RequestHandler().Generate_project_summary(projectId);
        }
        
        
        [EntryPoint(HttpMethods.Get, "/api/v1/projects/{projectId}/items")]
        public ItemsResponseDto Retrieve_project_items(string projectId) {
            Console.WriteLine($"items for {projectId}");

            return __RequestHandler().Retrieve_project_items(projectId);
        }


        [EntryPoint(HttpMethods.Post, "/api/v1/projects/{projectId}/submissions")]
        public void Submit_ordered_items(string projectId, [Payload] TotalOrderSubmissionDto req) {
            var ids = string.Join(",", req.ItemIds);
            Console.WriteLine($"submission: {req.StakeholderEmail}, {ids}");
            
            __RequestHandler().Submit_ordered_items(projectId, req);
        }
        
        
        [EntryPoint(HttpMethods.Get, "/api/v1/version")]
        public string Version() {
            var version = Assembly.GetExecutingAssembly().GetName().Version.ToString();
            version = $"{DateTime.Now}: TotalOrder Version {version}, dbPath: {Config.DbPath}";
            Console.WriteLine($"version: {version}");

            return version;
        }
    }
}