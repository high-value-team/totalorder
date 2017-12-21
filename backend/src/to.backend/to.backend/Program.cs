using System.Collections.Generic;
using to.backend.adapters;

namespace to.backend
{
    internal class Program
    {
        public static void Main(string[] args) {
            Config.Load(args);
            servicehost.ServiceHost.Run(Config.Address, new[]{typeof(RESTControllerV1)});
        }
    }
}