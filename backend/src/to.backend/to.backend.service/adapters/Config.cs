﻿using System;
using appcfg;

namespace to.backend.adapters
{
    public static class Config
    {
        public static void Load(string[] args)
        {
            var schema = new appcfg.AppCfgSchema(
                "to.backend.config.json",
                new Route("run", "start",isDefault:true)
                    .Param("address", "a", ValueTypes.String, "TOTALORDER_BACKEND_ADDRESS",defaultValue:"http://localhost:80")
                    .Param("dbpath", "db", ValueTypes.String, "TOTALORDER_BACKEND_DATABASEPATH",defaultValue:".")
            );
            
            var comp = new AppCfgCompiler(schema);
            var cfg = comp.Compile(args);
            
            Address = new Uri(cfg.address);
            DbPath = cfg.dbpath;
        }
        
        public static Uri Address { get; private set; }
        public static string DbPath { get; private set; }
    }
}