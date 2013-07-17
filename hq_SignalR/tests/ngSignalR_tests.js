/// <reference path="jasmine.js"/>
/// <reference path="../Scripts/jquery-2.0.1.js"/>
/// <reference path="../Scripts/angular.js"/>
/// <reference path="../Scripts/angular-mocks.js"/>
/// <reference path="../app/ngSignalR.js"/>

describe('ngSignalR', function () {

    beforeEach(module('ngSignalR')); // module under test
    
    beforeEach(function () {
        // SignalR mock - fairly minimal for testing ngSignalR
        // First created to test argument handling to event callbacks and to invoked methods. 
        $.hubConnection = function mockHubConnection() {
            var mockHubProxy = {
                on: function mockHubProxyOn(eventName, callback) {
                    connectionMock.onCapture = {
                        callback: callback // captured to simular event in test cases.
                    };
                },
                invoke: function mockHubProxyInvoke() { // params methodName, args
                    var args = Array.prototype.slice.call(arguments);
                    args.shift(); // discard methodName argument
                    mockHubProxy.invokeTargetMock.apply(mockHubProxy.invokeTargetMock, args);
                    mockHubProxy.invokeTargetMock = undefined; // reset for later test
                    return { done: function() { } };
                },
                invokeTargetMock: undefined
            };
            
            var connectionMock = {
                createHubProxy: function hubCreateMock(hubName) {
                    mockHubProxy.hubName = hubName;
                    return mockHubProxy;
                },
                start: function hubStartMock(startOptions) {
                    return { startOptions: startOptions };
                },
                setinvokeTargetMock: function (func) {
                    mockHubProxy.invokeTargetMock = func;
                }
            };
            return connectionMock;
        };
    });

    it('can get an instance of factory (tests if angular mocks in place)', inject(function (hubProxy) {
        expect(hubProxy).toBeDefined();
    }));

    describe('with signalR hubProxy', function () {
        var testProxy;
        
        beforeEach(inject(function (hubProxy) {
            testProxy = hubProxy(hubProxy.defaultServer, 'testProxy');
        }));

        it('can create a SignalR proxy', function() {
            expect(testProxy).not.toBeUndefined();
        });

        describe('start()', function() {
            var startedTestProxyResult;
            
            beforeEach(function() {
                startedTestProxyResult = testProxy.start({ startOption: 'Round' });
            });

            it('returns non null result', function () {
                expect(startedTestProxyResult).not.toBeUndefined();
                expect(startedTestProxyResult).not.toBeNull();
            });


            // tests for off() are not run as it duplicates on() code.
            describe('on() event', function () {
                var callbackCapture;

                function testEventCallback(p1, p2, p3, p4) {
                    callbackCapture.p1 = p1;
                    callbackCapture.p2 = p2;
                    callbackCapture.p3 = p3;
                    callbackCapture.p4 = p4;
                }

                beforeEach(function () {
                    testProxy.on('testEvent', testEventCallback);
                    callbackCapture = {};
                });

                it('passes no parameters', function () {
                    var onCallback = testProxy.connection.onCapture.callback;
                    onCallback();
                    var expected = {};
                    var expectedParams = JSON.stringify(expected);
                    var capturedParams = JSON.stringify(callbackCapture);
                    expect(capturedParams).toBe(expectedParams);
                });

                it('passes 1 parameter', function () {
                    var onCallback = testProxy.connection.onCapture.callback;
                    onCallback(23);
                    var expected = { p1: 23 };
                    var expectedParams = JSON.stringify(expected);
                    var capturedParams = JSON.stringify(callbackCapture);
                    expect(capturedParams).toBe(expectedParams);
                });
                
                it('passes 4 parameters', function () {
                    var onCallback = testProxy.connection.onCapture.callback;
                    onCallback({ f1: true }, 3, 5, 'seven');
                    var expected = { p1: { f1: true }, p2: 3, p3: 5, p4: 'seven' };
                    var expectedParams = JSON.stringify(expected);
                    var capturedParams = JSON.stringify(callbackCapture);
                    expect(capturedParams).toBe(expectedParams);
                });
            });

            describe('invoke() method', function () {
                it('pass only methodName to invoke', function() {
                    testProxy.connection.setinvokeTargetMock(
                        function () {
                            expect(arguments.length).toBe(0);
                        });
                    
                    testProxy.invoke('dummyMethodName');
                });

                it('pass methodName + callback to invoke', function () {
                    testProxy.connection.setinvokeTargetMock(
                        function () {
                            expect(arguments.length).toBe(0);
                        });

                    testProxy.invoke('dummyMethodName', 'dummyCallback');
                });
                
                it('pass methodname + 1 parameter + callback to invoke', function () {
                    testProxy.connection.setinvokeTargetMock(
                        function (p1) {
                            expect(arguments.length).toBe(1);
                            expect(p1).toBe('param1a');
                        });
                    
                    testProxy.invoke('dummyMethodName', 'param1a', 'dummyCallback');
                });
                
                it('pass methodname + 2 parameters + callback to invoke', function () {
                    testProxy.connection.setinvokeTargetMock(
                        function (p1, p2) {
                            expect(arguments.length).toBe(2);
                            expect(p1).toBe('param1b');
                            expect(p2).toBe(35);
                        });

                    testProxy.invoke('dummyMethodName', 'param1b', 35, 'dummyCallback');
                });
            });
        });
    });
});
