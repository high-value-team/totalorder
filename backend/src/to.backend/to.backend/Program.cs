using System.Collections.Generic;

namespace to.backend
{
    internal class Program
    {
        public static void Main(string[] args)
        {
            Config.Load(args);
            servicehost.ServiceHost.Run(Config.Address);
        }
    }
}