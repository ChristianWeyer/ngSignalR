using Microsoft.AspNet.SignalR;
using System;
using System.Threading;
using System.Web.Hosting;

namespace AngularJS.Integration.SignalR
{
    public class BackgroundServerTimeTimer : IRegisteredObject
    {
        private Timer taskTimer;
        private IHubContext hub;

        public BackgroundServerTimeTimer()
        {
            HostingEnvironment.RegisterObject(this);

            hub = GlobalHost.ConnectionManager.GetHubContext<ClientPushHub>();
            taskTimer = new Timer(OnTimerElapsed, null, TimeSpan.FromSeconds(1), TimeSpan.FromSeconds(5));
        }

        private void OnTimerElapsed(object sender)
        {
            hub.Clients.All.serverTime(DateTime.UtcNow.ToString());
        }

        public void Stop(bool immediate)
        {
            taskTimer.Dispose();

            HostingEnvironment.UnregisterObject(this);
        }
    }
}