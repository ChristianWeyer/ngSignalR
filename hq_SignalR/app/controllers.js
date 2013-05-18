'use strict';

function ServerTimeController($scope, hubProxy) {
    var clientPushHubProxy = hubProxy(hubProxy.defaultServer, 'clientPushHub', { logging: true });
    var serverTimeHubProxy = hubProxy(hubProxy.defaultServer, 'serverTimeHub');
    clientPushHubProxy.start();
    serverTimeHubProxy.start().done(function() {
        getTimeFromServer();
    });

    clientPushHubProxy.on('serverTime', function (data) {
        $scope.currentServerTime = data;
        var x = clientPushHubProxy.connection.id;
    });
    
    $scope.getServerTime = function () {
        getTimeFromServer();
    };
    
    function getTimeFromServer() {
        serverTimeHubProxy.invoke('getServerTime', function (data) {
            $scope.currentServerTimeManually = data;
        });
    }
};

function PerformanceDataController($scope, hubProxy) {
    var performanceDataHub = hubProxy(hubProxy.defaultServer, 'performanceDataHub');
    performanceDataHub.start();
    
    performanceDataHub.on('newCpuDataValue', function (data) {
        $scope.cpuData = data;
    });
};