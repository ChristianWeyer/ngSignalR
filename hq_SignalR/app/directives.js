'use strict';

app.directive('smoothieChart', function () {
    return {
        restrict: "E",
        replace: true,
        transclude: true,
        template: '<canvas>Your browser does not support the HTML 5 canvas element.</canvas>',
        link: function (scope, elem, attrs) {
            var values = new TimeSeries();
            var chart = new SmoothieChart();
            chart.addTimeSeries(values, { strokeStyle: 'rgba(0, 255, 0, 1)', fillStyle: 'rgba(0, 255, 0, 0.2)', lineWidth: 4 });
            chart.streamTo(elem[0], 1000);

            scope.$watch(attrs.data, function (newScopeData) {
                values.append(new Date().getTime(), parseFloat(newScopeData));
            });
        }
    };
});
