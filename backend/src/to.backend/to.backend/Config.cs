using System;
using appcfg;

namespace to.backend
{
    internal static class Config
    {
        public static void Load(string[] args)
        {
            var schema = new appcfg.AppCfgSchema(
                "to.backend.config.json",
                new Route("run", "start",isDefault:true)
                    .Param("address", "a", ValueTypes.String, "TOTALORDER_BACKEND_ADDRESS",defaultValue:"http://localhost:80")
            );
            
            var comp = new AppCfgCompiler(schema);
            var cfg = comp.Compile(args);
            
            Address = new Uri(cfg.address);
        }
        
        public static Uri Address { get; private set; }
    }
}