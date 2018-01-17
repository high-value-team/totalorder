namespace to.backend.contract
{
    public interface IMailProvider {
        void Send_notification(string toEmail, string subject, string text);
    }
}