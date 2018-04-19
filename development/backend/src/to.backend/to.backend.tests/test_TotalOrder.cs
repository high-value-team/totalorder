using NUnit.Framework;
using to.backend.service;

namespace to.backend.tests
{
    [TestFixture]
    public class test_TotalOrder
    {
        [Test]
        public void Calculate_just_one()
        {
            var itemOrders = new[] {
                new[]{"1","2","3"}
            };

            var result = TotalOrder.Calculate(itemOrders);
            
            Assert.AreEqual(new[]{"1","2","3"}, result);
        }


        [Test]
        public void Calculate_several()
        {
            var itemOrders = new[] {
                new[]{"1","2","3"},
                new[]{"3", "1", "2"}
            };

            var result = TotalOrder.Calculate(itemOrders);
            
            // 1=0+1=1, 2=1+2=3, 3=2+0=2
            Assert.AreEqual(new[]{"1","3","2"}, result);   
        }
        
        [Test]
        public void No_orders()
        {
            var itemOrders = new string[0][];

            var result = TotalOrder.Calculate(itemOrders);
            
            Assert.AreEqual(0, result.Length);   
        }
    }
}