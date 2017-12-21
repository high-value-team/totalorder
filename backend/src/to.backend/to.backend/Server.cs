using System;
using to.backend.adapters;
using to.backend.contract;

namespace to.backend
{
    class Server {
        public Server(IRequestHandler requestHandler) {
            RESTControllerV1.__RequestHandler = () => requestHandler;
        }

        public void Run(Uri address) {
            servicehost.ServiceHost.Run(address, new[]{typeof(RESTControllerV1)});
        }
    }
}