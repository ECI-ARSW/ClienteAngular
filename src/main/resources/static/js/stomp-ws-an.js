/**
 * Created by mariale on 5/9/16.
 */
(function () {
    var app = angular.module("chat", []);

    app.controller("ChatController", function () {
       this.connected = true;
        this.connect = function () {
            var socket = new SockJS('/ws');
            stompClient = Stomp.over(socket);
            stompClient.connect({}, function(frame) {
                setConnected(true);
                console.log('Connected: ' + frame);
                stompClient.subscribe('/topic/messages', function(serverMessage){
                    showServerMessage(JSON.parse(serverMessage.body).content);
                });
            });
        };
    });

})();


