using System.Collections.Generic;
using to.backend.adapters;
using to.backend.service;

namespace to.backend
{
    internal class Program
    {
        public static void Main(string[] args) {
            var server = new Server(new RequestHandler());
            
            Config.Load(args);
            server.Run(Config.Address);
        }
    }
}