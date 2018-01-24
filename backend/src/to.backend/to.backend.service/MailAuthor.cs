using to.backend.service.data;

namespace to.backend.service
{
    internal class MailAuthor
    {
        private readonly Project _project;
        public MailAuthor(Project project) { _project = project; }
        
        public string Project_created_message
            => $@"
Awesome! You successfully registered your project

  '{_project.Title}'

to be brought into a total order.

Send the link {_project.RearrangePageUrl} to the project's stakeholders to invite them to bring the project items
into an order according to their point of view.

Use the link {_project.SummaryPageUrl} at any time to check the current state of the total ordering process.

Enjoy the lightness of TotalOrder!
".Trim();

        public string Total_order_submitted_message
            => $@"
A stakeholder has submitted a total order for the project items.

Check out the current state of the total ordering process at {_project.SummaryPageUrl}.

Enjoy the lightness of TotalOrder!
".Trim();
    }
}