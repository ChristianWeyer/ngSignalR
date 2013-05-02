using System.Diagnostics;
using Microsoft.AspNet.SignalR;
using System;
using System.Threading;
using System.Web.Hosting;

namespace AngularJS.Integration.SignalR
{
    public class BackgroundPerformanceDataTimer : IRegisteredObject
    {
        //private readonly PerformanceCounter processorCounter = new PerformanceCounter("Processor", "% Processor Time", "_Total");
        private Timer taskTimer;
        private IHubContext hub;

        public BackgroundPerformanceDataTimer()
        {
            HostingEnvironment.RegisterObject(this);

            hub = GlobalHost.ConnectionManager.GetHubContext<PerformanceDataHub>();
            taskTimer = new Timer(OnTimerElapsed, null, 1000, 1000);
        }

        private void OnTimerElapsed(object sender)
        {
            //var perfValue = processorCounter.NextValue().ToString("0.0");
            var r = new Random();
            var perfValue = r.Next(40, 70).ToString();

            hub.Clients.All.newCpuDataValue(perfValue);
        }

        public void Stop(bool immediate)
        {
            taskTimer.Dispose();

            HostingEnvironment.UnregisterObject(this);
        }
    }
}