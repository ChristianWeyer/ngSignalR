app.factory("clientPushHubService", ["hubProxy", "$q", function (hubProxy, $q) {
    var deferred = $q.defer();

    var hub = hubProxy(hubProxy.defaultServer, "clientPushHub");
    hub.on("serverTime");
    hub.start()
        .done(function () {
            deferred.resolve(hub);
        })
        .fail(function () {
            deferred.reject(hub);
        });

    return deferred.promise;
}]);

app.factory("serverTimeHubService", ["hubProxy", "$q", function (hubProxy, $q) {
    var deferred = $q.defer();

    var hub = hubProxy(hubProxy.defaultServer, "serverTimeHub");
    hub.start()
        .done(function () {
            deferred.resolve(hub);
        })
        .fail(function () {
            deferred.reject(hub);
        });

    return deferred.promise;
}]);

app.factory("performanceDataHubService", ["hubProxy", "$q", function (hubProxy, $q) {
    var deferred = $q.defer();

    var hub = hubProxy(hubProxy.defaultServer, "performanceDataHub");
    hub.on("newCpuDataValue");
    hub.start()
        .done(function () {
            deferred.resolve(hub);
        })
        .fail(function () {
            deferred.reject(hub);
        });

    return deferred.promise;
}]);
