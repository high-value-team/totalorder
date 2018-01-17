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
            var mail = new MailgunMailProvider();
            var rh = new RequestHandler(repo, mail);
            var server = new Server(rh);
            
            server.Run(Config.Address);
        }
    }
}