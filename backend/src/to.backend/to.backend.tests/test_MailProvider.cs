using System;
using System.Globalization;
using NUnit.Framework;
using to.backend.service.adapters;

namespace to.backend.tests
{
    [TestFixture]
    public class test_MailProvider
    {
        [Test, Explicit]
        public void Send_notification()
        {
            var sut = new MailgunMailProvider();
            sut.Send_notification("balin@ralfw.de", 
                                  $"A message from NUnit / {DateTime.Now}", 
                                  "BEGIN{\n1\n2 http://google.com\n3\n}END");
        }
    }
}