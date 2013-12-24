
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