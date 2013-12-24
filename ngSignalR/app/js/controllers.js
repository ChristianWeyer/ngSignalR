app.controller("ServerTimeController", function ($scope, serverTimeHubService, subscribePrefix) {
    $scope.$on(subscribePrefix + "serverTime", function (evt, data) {
        $scope.currentServerTime = data;
    });

    $scope.getServerTime = function () {
        getTimeFromServer();
    };

    function getTimeFromServer() {
        serverTimeHubService.then(function(hub) {
            hub.invoke("getServerTime", function (data) {
                $scope.currentServerTimeManually = data;
            });
        });
    }
});

app.controller("PerformanceDataController", function ($scope, subscribePrefix) {
    $scope.$on(subscribePrefix + "newCpuDataValue", function (evt, data) {
        $scope.cpuData = data;
    });
});
