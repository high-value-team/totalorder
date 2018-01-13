using System;
using to.backend.contract.dto;

namespace to.backend.contract
{
    /*
     * Responsible for handling requests. Works in DTOs (regardless where they come from/go to).
     */
    public interface IRequestHandler
    {
        string Create_project(CreateProjectRequestDto req);
    }
}