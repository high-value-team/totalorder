using System;
using to.backend.contract;

namespace to.backend.service
{
    public class RequestHandler : IRequestHandler
    {
        public string Create_project(string title, string productOwnerEmail, string[] items) {
            return Guid.NewGuid().ToString();
        }
    }
}