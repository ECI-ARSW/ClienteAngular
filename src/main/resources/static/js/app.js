(function () {
    var laboratorio = "ARSW-Lab";
    var personaG={};
    //Si es verdadero es profesor, si no, es estudiante.
    var app = angular.module("aplicacion",['ui.router']);
    var editor;
    var connected = false;
    var id = Math.floor((Math.random() * 1000) + Math.random() * 2);
    var stompClient = null;
    var dmp = new diff_match_patch();
    var interval;
    var socket;

    app.controller("NavController", function () {
       this.isConnected = function () {
          return connected;
       };

       this.getUser = function () {
           return personaG.nombre;
       }
    });

    app.controller("LoginController", ['$scope', '$http' , '$location', function ($scope, $http, $location){
        $scope.person={};
        var session = this;
        session.person={};
        $scope.iniciar = function() {
            $http.get('http://localhost:8084/labncode/rest/servicios/persona/' + $scope.person.id).success(function (data) {
                console.log(data);
                session.person = data;
                personaG.nombre=session.person.nombre;
                personaG.session_kind=session.person.profesor;
                connected = true;
            });
            $location.path("laboratorios");
        }

    }]);


    app.controller("LabController", ['$scope', '$http', function ($scope, $http){

        this.isConnected = function(){
            console.log(connected)
            return connected;
        }

        this.getUser = function () {
            return personaG.nombre;
        }

        this.setLab = function (lab) {
            laboratorio = lab;
        };
        this.getLaboratorio = function () {
            return laboratorio;
        };

        this.connect=function () {
            socket = new SockJS('/ws');
            stompClient = Stomp.over(socket);
            stompClient.connect({}, function (frame) {
                console.log('Connected: ' + frame);
                stompClient.subscribe('/topic/code', function (greeting) {
                    var j = JSON.parse(greeting.body);
                    $scope.showCode(j.content, j.server, j.id);
                });
            });
            interval = setInterval($scope.sendCode, 500);
        }

        $scope.disconnect = function () {
            if (stompClient != null) {
                stompClient.disconnect();
            }
            setConnected(false);
            console.log("Disconnected");
            clearInterval(interval);
        }

        $scope.sendCode = function () {
            var name = editor.getValue();
            stompClient.send("/app/message", {}, JSON.stringify({'name': name, 'id': id}));
        }

        $scope.showCode= function (content, server, oid) {
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

        $scope.init= function(){
            console.log("Llamando")
            $scope.connect();
        }
    }]);



    app.controller("TabController", ['$http', function ($http) {
        this.tab = 1;

        this.setTab = function (tab) {
            this.tab = tab;
        };

        this.isSet = function (tab) {
            return this.tab === tab;
        };
        var enunciado = this;
        enunciado.grupos = [];
        enunciado.puntos = [];
        $http.get('http://localhost:8084/labncode/rest/servicios/laboratorio/' + laboratorio + '/enunciado').success(function (data) {
            enunciado.puntos = data.puntos;
        });
        $http.get('http://localhost:8084/labncode/rest/servicios/laboratorio/' + laboratorio + '/grupos').success(function (data) {
            console.log(data);
            enunciado.grupos = data;
            console.log(enunciado.grupos)
        });

    }]);

    app.controller("submit", ['$http', function ($http) {
        this.punto = {};
        this.addPunto = function (puntos) {
            console.log(this.punto);
            console.log(puntos);
            puntos.push(this.punto);
            $http.post('http://localhost:8084/labncode/rest/servicios/laboratorio/' + laboratorio + '/enunciado/puntos', this.punto).success(function (data) {
                console.log(data);
            });
            this.punto = {};
        };
    }]);

    app.directive('editor', function () {
        var controller = ['$scope', function ($scope) {

            function conectar() {
                socket = new SockJS('/wbs');
                stompClient = Stomp.over(socket);
                stompClient.connect({}, function (frame) {
                    console.log('Connected: ' + frame);
                    stompClient.subscribe('/topicide/messages', function (parche) {
                        var j = JSON.parse(parche.body);
                        actualizarCodigo(j.content, j.server, j.id);
                    });
                });
            }
            function enviarMensaje() {
                var name = editor.getValue();
                stompClient.send("/app/code", {}, JSON.stringify({'code': name, 'id': id}));
            }
            function actualizarCodigo(content, server, oid) {
                console.log(content, server, oid);
                if (oid != id) {
                    var patches = dmp.patch_make(server, content);
                    //var text2 = document.getElementById('code').value;
                    var text2 = editor.getValue();
                    var results = dmp.patch_apply(patches, text2);
                    var iniCursor = editor.getCursor();
                    editor.setValue(results[0]);
                    editor.setCursor(iniCursor);
                }
            }
            editor = CodeMirror.fromTextArea(document.getElementById("code"), {
                mode: {name: "python",
                    version: 3,
                    singleLineStringErrors: false},
                lineNumbers: true,
                indentUnit: 4,
                matchBrackets: true
            });
            conectar();
            setInterval(enviarMensaje, 1000);
        }]
        return {
            controller: controller,
        };
    });


    app.config(function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/home');
        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'templates/login.html'
            })
            .state('about', {
                // we'll get to this in a bit
            })
            .state('laboratorios', {
                url: '/laboratorios',
                templateUrl: 'templates/laboratorios.html'
            })
    });

})();