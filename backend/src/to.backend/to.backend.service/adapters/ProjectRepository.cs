using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using to.backend.service.data;

namespace to.backend.service.adapters
{
    public class ProjectRepository
    {
        private readonly string _path;
        private readonly System.Web.Script.Serialization.JavaScriptSerializer _json;
        
        public ProjectRepository(string path) {
            _path = path;
            _json = new System.Web.Script.Serialization.JavaScriptSerializer();
        }
        
        public void Create(Project project) {
            if (string.IsNullOrEmpty(project.Id))
                throw new ApplicationException("ProjectRepository/Create projekt: Missing project id!");
            
            var projectJson = _json.Serialize(project);
            File.WriteAllText(new ProjectFilepath(_path, project.Id).Value, projectJson);
        }

        public Project Load(string projectId) {
            var project = Load_project(projectId);
            project.ItemOrders = Load_item_orders(projectId).ToArray();
            return project;
        }

        private Project Load_project(string projectId) {
            var projectJson = File.ReadAllText(new ProjectFilepath(_path, projectId).Value);
            return _json.Deserialize<Project>(projectJson);
        }

        private IEnumerable<ItemOrder> Load_item_orders(string projectId) {
            var projectItemOrderFilepaths = Directory.GetFiles(_path)
                                                     .Where(fp => ItemOrderFilepath.Belongs_to_project(fp, projectId));
            return projectItemOrderFilepaths.Select(fp => {
                var itemOrderJson = File.ReadAllText(fp);
                return _json.Deserialize<ItemOrder>(itemOrderJson);
            });
        }


        public void Add_item_order_to_project(string projectId, ItemOrder itemOrder) {
            var itemOrderJson = _json.Serialize(itemOrder);
            File.WriteAllText(new ItemOrderFilepath(_path, projectId, itemOrder.StakeholderEmail).Value, itemOrderJson);
        }
        
        
        private class ProjectFilepath {
            public ProjectFilepath(string repoPath, string projectId) {
                Value =  Path.Combine(repoPath, $"{projectId}.json");
            }
            
            public string Value { get; }   
        }

        
        private class ItemOrderFilepath
        {
            public ItemOrderFilepath(string repoPath, string projectId, string stakeholderEmail) {
                Value = Path.Combine(repoPath, $"{projectId}-{stakeholderEmail}.json");
            }

            public string Value { get; }

            public static bool Belongs_to_project(string filepath, string projectId)
                => filepath.IndexOf(projectId + "-") > 0;
        }
    }
}