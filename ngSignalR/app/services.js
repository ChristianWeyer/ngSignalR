app.factory("clientPushHubService", ["hubProxy", function (hubProxy) {
    var hub = hubProxy(hubProxy.defaultServer, "clientPushHub");
    hub.start();

    return hub;
}]);

app.factory("serverTimeHubService", ["hubProxy", function (hubProxy) {
    var hub = hubProxy(hubProxy.defaultServer, "serverTimeHub");

    return hub;
}]);

app.factory("performanceDataHubService", ["hubProxy", function (hubProxy) {
    var hub = hubProxy(hubProxy.defaultServer, "performanceDataHub");
    hub.start();

    return hub;
}]);
