using System;
using RestSharp;
using RestSharp.Authenticators;
using to.backend.contract;

namespace to.backend.service.adapters
{
    // https://documentation.mailgun.com/en/latest/quickstart-sending.html

    public class MailgunMailProvider : IMailProvider
    {
        private const string MAILGUN_API_KEY = "key-824caabd4982099ec82d2b10e442669f";
        private const string TOTAL_ORDER_DOMAIN_NAME = "ralfw.de"; // needs to be registered with MailGun
        private const string TOTAL_ORDER_FROM_EMAIL = "noreply-totalorder@ralfw.de"; // needs to be long to the registered domain
        
        
        public void Send_notification(string toEmail, string subject, string text) {
            var client = new RestClient {
                BaseUrl = new Uri("https://api.mailgun.net/v3"),
                Authenticator = new HttpBasicAuthenticator("api", MAILGUN_API_KEY)
            };
            
            var request = new RestRequest ();
            request.AddParameter ("domain", TOTAL_ORDER_DOMAIN_NAME, ParameterType.UrlSegment);
            request.Resource = "{domain}/messages";
            request.AddParameter ("from", TOTAL_ORDER_FROM_EMAIL);
            request.AddParameter ("to", toEmail);
            request.AddParameter ("subject", subject);
            request.AddParameter ("text", text);
            request.Method = Method.POST;
            
            client.Execute (request);
        }
    }
}