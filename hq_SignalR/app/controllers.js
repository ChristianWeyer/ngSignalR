'use strict';

function ServerTimeController($scope, signalRHubProxy) {
    var clientPushHubProxy = signalRHubProxy(signalRHubProxy.defaultServer, 'clientPushHub', { logging: true });
    var serverTimeHubProxy = signalRHubProxy(signalRHubProxy.defaultServer, 'serverTimeHub');

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

function PerformanceDataController($scope, signalRHubProxy) {
    var performanceDataHub = signalRHubProxy(signalRHubProxy.defaultServer, 'performanceDataHub');
    
    performanceDataHub.on('newCpuDataValue', function (data) {
        $scope.cpuData = data;
    });
};