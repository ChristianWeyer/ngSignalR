using System.Web.Http;
using System.Web.Mvc;
using System.Web.Routing;
using Microsoft.AspNet.SignalR;

namespace AngularJS.Integration.SignalR
{
    public class MvcApplication : System.Web.HttpApplication
    {
        private BackgroundServerTimeTimer bstt;
        private BackgroundPerformanceDataTimer bpdt;

        protected void Application_Start()
        {
            bstt = new BackgroundServerTimeTimer();
            bpdt = new BackgroundPerformanceDataTimer();
        }
    }
}