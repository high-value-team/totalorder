using System;
using System.Diagnostics;
using System.IO;
using NUnit.Framework;
using to.backend.contract;
using to.backend.contract.dto;
using to.backend.service;
using to.backend.service.adapters;

namespace to.backend.tests
{
    [TestFixture]
    public class test_RequestHandler
    {
        private const string REPO_PATH = "projects";

        [SetUp]
        public void Setup() {
            if (Directory.Exists(REPO_PATH)) Directory.Delete(REPO_PATH, true);
            Directory.CreateDirectory(REPO_PATH);
        }

        [Test]
        public void Get_project_estimated()
        {
            var repo = new ProjectRepository(REPO_PATH);
            var mail = new MockMailProvider();
            var sut = new RequestHandler(repo, mail);

            // create project
            var projectId = "123abc";
            var prjId = sut.Create_project(new CreateProjectRequestDto {
                Id = projectId,
                Title = "P1",
                ProductOwnerEmail = "po@acme.com",
                Items = new[] {"a", "b", "c"},
                SummaryPageUrlSchema = "summary/{projectid}",
                RearrangePageUrlSchema = "rearrange/{PROJECTID}"
            });
            Assert.IsTrue(mail.Body.IndexOf("summary/"+projectId) > 0);
            Assert.IsTrue(mail.Body.IndexOf("rearrange/"+projectId) > 0);

            // initial summary shows items in original order
            var summary = sut.Generate_project_summary(prjId);
            Assert.AreEqual("P1", summary.Title);
            Assert.AreEqual(0, summary.NumberOfSubmissions);
            Assert.AreEqual(new[]{"a", "b", "c"}, summary.Items);
            
            // retrieve items for ordering
            var items = sut.Retrieve_project_items(prjId);
            Assert.AreEqual("P1", items.Title);
            Assert.AreEqual("0", items.Items[0].Id);
            Assert.AreEqual("a", items.Items[0].Text);
            Assert.AreEqual("1", items.Items[1].Id);
            Assert.AreEqual("b", items.Items[1].Text);
            Assert.AreEqual("2", items.Items[2].Id);
            Assert.AreEqual("c", items.Items[2].Text);
            
            // submit first total order
            sut.Submit_ordered_items(prjId, new TotalOrderSubmissionDto {
                StakeholderEmail = "s1@acme.com",
                ItemIds = new[]{"0", "2", "1"}
            });
            Assert.IsTrue(mail.Body.IndexOf("summary/"+projectId) > 0);

            // summary reflects first total order
            summary = sut.Generate_project_summary(prjId);
            Assert.AreEqual("P1", summary.Title);
            Assert.AreEqual(1, summary.NumberOfSubmissions);
            Assert.AreEqual(new[]{"a", "c", "b"}, summary.Items);
            
            // submit second total order
            sut.Submit_ordered_items(prjId, new TotalOrderSubmissionDto {
                StakeholderEmail = "s2@acme.com",
                ItemIds = new[]{"2", "1", "0"}
            });
            
            // summary reflects second total order
            // 0:0+2=2, 1:2+1=3, 2:1+0=1
            summary = sut.Generate_project_summary(prjId);
            Assert.AreEqual(2, summary.NumberOfSubmissions);
            Assert.AreEqual(new[]{"c", "a", "b"}, summary.Items);   
        }


        class MockMailProvider : IMailProvider
        {
            public string Body;
            
            public void Send_notification(string toEmail, string subject, string body)
            {
                Body = body;
                Debug.WriteLine($"Sending mail: {toEmail}, {subject}, {body}");
            }
        }
    }
}