using System;
using System.IO;
using System.Net.Mime;
using NUnit.Framework;
using to.backend.service;
using to.backend.service.adapters;
using to.backend.service.data;

namespace to.backend.tests
{
    [TestFixture]
    public class test_ProjectRepository
    {
        private const string REPO_PATH = "projects";
        
        [SetUp]
        public void Setup() {
            if (Directory.Exists(REPO_PATH)) Directory.Delete(REPO_PATH, true);
            Directory.CreateDirectory(REPO_PATH);
        }


        [Test]
        public void Create_and_load_project()
        {
            var sut = new ProjectRepository(REPO_PATH);

            var projectId = "123";
            var prj = new Project {
                Id = projectId,
                Title = "T1",
                ProductOwnerEmail = "po@acme.com",
                Items = new[]{"a", "b", "c"},
                SummaryPageUrl = "summary/123",
                RearrangePageUrl = "rearrange/123"
            };
            sut.Create(prj);

            var loadedPrj = sut.Load(projectId);
            
            Assert.AreEqual(projectId, loadedPrj.Id);
            Assert.AreEqual(prj.Title, loadedPrj.Title);
            Assert.AreEqual(prj.ProductOwnerEmail, loadedPrj.ProductOwnerEmail);
            Assert.AreEqual(prj.Items, loadedPrj.Items);
            Assert.AreEqual(0, loadedPrj.ItemOrders.Length);
            Assert.AreEqual("summary/123", loadedPrj.SummaryPageUrl);
            Assert.AreEqual("rearrange/123", loadedPrj.RearrangePageUrl);
        }
        
        
        [Test]
        public void Project_must_have_id_upon_submission()
        {
            var sut = new ProjectRepository(REPO_PATH);

            var prj = new Project {
                Title = "T1"
            };

            Assert.Throws<ApplicationException>(() => sut.Create(prj));
        }

        
        [Test]
        public void Project_with_same_id_overwrites_previous()
        {
            var sut = new ProjectRepository(REPO_PATH);

            var prj = new Project {
                Id = "myproject",
                Title = "T1",
                ProductOwnerEmail = "po@acme.com",
                Items = new[]{"a", "b", "c"}
            };
            sut.Create(prj);
            
            var prjOverwritten = new Project {
                Id = "myproject",
                Title = "Toverwritten",
                ProductOwnerEmail = "po@acme.com",
                Items = new[]{"x", "y", "z"}
            };
            sut.Create(prjOverwritten);

            var loadedPrj = sut.Load("myproject");
            
            Assert.AreEqual(prjOverwritten.Title, loadedPrj.Title);
        }



        [Test]
        public void Add_item_orders_to_project()
        {
            var sut = new ProjectRepository(REPO_PATH);

            var projectId = "123";
            var prj = new Project {
                Id = projectId,
                Title = "T2",
                ProductOwnerEmail = "po@acme.com",
                Items = new[]{"x", "y", "z"}
            };
            sut.Create(prj);
            
            sut.Add_item_order_to_project(projectId, new ItemOrder{StakeholderEmail = "s1@acme.com", ItemIds = new[]{"0","1","2"}});
            sut.Add_item_order_to_project(projectId, new ItemOrder{StakeholderEmail = "s2@acme.com", ItemIds = new[]{"2","1","0"}});
            
            var loadedPrj = sut.Load(projectId);
            Assert.AreEqual(2,loadedPrj.ItemOrders.Length);
            Assert.AreEqual("s1@acme.com", loadedPrj.ItemOrders[0].StakeholderEmail);
            Assert.AreEqual(new[]{"0", "1", "2"}, loadedPrj.ItemOrders[0].ItemIds);
            Assert.AreEqual("s2@acme.com", loadedPrj.ItemOrders[1].StakeholderEmail);
            Assert.AreEqual(new[]{"2", "1", "0"}, loadedPrj.ItemOrders[1].ItemIds);
        }
        
        [Test]
        public void Overwrite_item_order()
        {
            var sut = new ProjectRepository(REPO_PATH);

            var projectId = "987";
            var prj = new Project {
                Id = projectId,
                Title = "T3",
                ProductOwnerEmail = "po@acme.com",
                Items = new[]{"x", "y", "z"}
            };
            sut.Create(prj);
            
            sut.Add_item_order_to_project(projectId, new ItemOrder{StakeholderEmail = "s1@acme.com", ItemIds = new[]{"0","1","2"}});
            sut.Add_item_order_to_project(projectId, new ItemOrder{StakeholderEmail = "s1@acme.com", ItemIds = new[]{"2","1","0"}});
            
            var loadedPrj = sut.Load(projectId);
            Assert.AreEqual(1,loadedPrj.ItemOrders.Length);
            Assert.AreEqual("s1@acme.com", loadedPrj.ItemOrders[0].StakeholderEmail);
            Assert.AreEqual(new[]{"2", "1", "0"}, loadedPrj.ItemOrders[0].ItemIds);
        }
    }
}