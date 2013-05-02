'use strict';

function ServerTimeController($scope, hubProxy) {
    var clientPushHubProxy = hubProxy(hubProxy.defaultServer, 'clientPushHub', { logging: true }).start();
    var serverTimeHubProxy = hubProxy(hubProxy.defaultServer, 'serverTimeHub').start();

    clientPushHubProxy.on('serverTime', function (data) {
        $scope.currentServerTime = data;
        var x = clientPushHubProxy.connection.id;
    });
    
    $scope.getServerTime = function () {
        serverTimeHubProxy.invoke('getServerTime', function (data) {
            $scope.currentServerTimeManually = data;
        });
    };
};

function PerformanceDataController($scope, hubProxy) {
    var performanceDataHub = hubProxy(hubProxy.defaultServer, 'performanceDataHub').start();
    
    performanceDataHub.on('newCpuDataValue', function (data) {
        $scope.cpuData = data;
    });
};