using System.Collections.Generic;
using to.backend.adapters;
using to.backend.service;
using to.backend.service.adapters;

namespace to.backend
{
    internal class Program
    {
        public static void Main(string[] args) {
            Config.Load(args);
            
            var repo = new ProjectRepository(Config.DbPath);
            var rh = new RequestHandler(repo);
            var server = new Server(rh);
            
            server.Run(Config.Address);
        }
    }
}