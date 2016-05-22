
var id = Math.floor((Math.random() * 1000) + Math.random() * 2);
var stompClient = null;
var dmp = new diff_match_patch();
var interval;
var socket;
var editor;
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/*var stompClient = null;

function setConnected(connected) {
    document.getElementById('connect').disabled = connected;
    document.getElementById('disconnect').disabled = !connected;
    document.getElementById('conversationDiv').style.visibility = connected ? 'visible' : 'hidden';
    document.getElementById('response').innerHTML = '';
}
*/
function connect() {
    socket = new SockJS('/ws');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/messages', function (greeting) {
            var j = JSON.parse(greeting.body);
            $scope.showServerMessage(j.content, j.server, j.id);
        });
    });
    interval = setInterval(sendMessage, 500);
}

function disconnect() {
    if (stompClient != null) {
    stompClient.disconnect();
    }
    setConnected(false);
    console.log("Disconnected");
}

function sendMessage() {
    var name = editor.getValue();
    stompClient.send("/app/message", {}, JSON.stringify({'name': name, 'id': id}));
}

function showServerMessage(message) {
    console.log(content, server, oid);
    if (oid != id) {
        var patches = dmp.patch_make(server, content);
        var text2 = editor.getValue();
        var results = dmp.patch_apply(patches, text2);
        var iniCursor = editor.getCursor();
        editor.setValue(results[0]);
        editor.setCursor(iniCursor);
    }
}

function init() {
    console.log("Llamando");
    editor = CodeMirror.fromTextArea(document.getElementById("code"), {
        mode: {name: "python",
            version: 3,
            singleLineStringErrors: false},
        lineNumbers: true,
        indentUnit: 4,
        matchBrackets: true
    });
    connect();
}

window.onload = init;


