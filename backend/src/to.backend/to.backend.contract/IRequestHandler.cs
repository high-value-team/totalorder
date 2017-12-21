using System;

namespace to.backend.contract
{
    public interface IRequestHandler
    {
        string Create_project(string title, string productOwnerEmail, string[] items);
    }
}