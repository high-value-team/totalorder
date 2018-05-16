using System;
using to.backend.contract.dto;

namespace to.backend.contract
{
    /*
     * Responsible for handling requests. Works in DTOs (regardless where they come from/go to).
     */
    public interface IRequestHandler {
        string Create_project(CreateProjectRequestDto req);
        ProjectSummaryResponseDto Generate_project_summary(string projectId);
        ItemsResponseDto Retrieve_project_items(string projectId);
        void Submit_ordered_items(string projectId, TotalOrderSubmissionDto req);
    }
}