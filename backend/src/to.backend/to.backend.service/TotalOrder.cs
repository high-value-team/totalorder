using System;
using System.Collections.Generic;
using System.Linq;

namespace to.backend.service
{
    public class TotalOrder
    {
        public static string[] Calculate(string[][] itemOrders)
        {
            if (!itemOrders.Any()) return new string[0];
            
            var idScores = itemOrders.First().Aggregate(new Dictionary<string, int>(), (dict, id) => { dict[id] = 0; return dict; });

            foreach (var io in itemOrders)
                for (var i = 0; i < io.Length; i++)
                    idScores[io[i]] += i;

            var totalOrder = idScores.OrderBy(id => id.Value).Select(id => id.Key).ToArray();
            return totalOrder;
        }
    }
}