using System;
using System.Reflection;
using servicehost.contract;

namespace to.backend.service
{
    [Service]
    public class RESTController
    {
        [EntryPoint(HttpMethods.Get, "/api/v1/version")]
        public string Version() {
            var version = Assembly.GetExecutingAssembly().GetName().Version.ToString();
            return $"{DateTime.Now}: TotalOrder Version {version}";
        }
    }
}