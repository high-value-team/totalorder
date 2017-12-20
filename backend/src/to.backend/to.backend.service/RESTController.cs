using System;
using System.Reflection;
using servicehost.contract;
using to.backend.adapters;

namespace to.backend.service
{
    public class CreateProjectRequest {
        public string Title;
        public string Owner;
        public string[] Items;
    } 
    
    
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
        
        
        
        [EntryPoint(HttpMethods.Get, "/api/v1/version")]
        public string Version() {
            var version = Assembly.GetExecutingAssembly().GetName().Version.ToString();
            return $"{DateTime.Now}: TotalOrder Version {version}, dbPath: {Config.DbPath}";
        }
    }
}