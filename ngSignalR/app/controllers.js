app.controller("ServerTimeController", function ($scope, clientPushHubService, serverTimeHubService) {
    clientPushHubService.on('serverTime', function (data) {
        $scope.currentServerTime = data;
    });
    
    serverTimeHubService.start().done(function () {
        getTimeFromServer();
    });
    
    $scope.getServerTime = function () {
        getTimeFromServer();
    };

    function getTimeFromServer() {
        serverTimeHubService.invoke('getServerTime', function (data) {
            $scope.currentServerTimeManually = data;
        });
    }
});

app.controller("PerformanceDataController", function ($scope, performanceDataHubService) {
    performanceDataHubService.on('newCpuDataValue', function (data) {
        $scope.cpuData = data;
    });
});