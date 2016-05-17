(function () {
    var laboratorio = "ARSW-Lab";
    var app = angular.module("estudiante", []);


    app.controller("LabController", function () {
        this.setLab = function (lab) {
            laboratorio = lab;
        };
        this.getLaboratorio = function () {
            return laboratorio;
        };

    });

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
                enunciado.puntos=data.puntos;
            });
            $http.get('http://localhost:8084/labncode/rest/servicios/laboratorio/' + laboratorio+'/grupos').success(function (data) {
                console.log(data);
                enunciado.grupos = data;
                console.log(enunciado.grupos)
            });

        }]);
    
    app.controller("submit",['$http',function ($http){
        this.punto={};
        this.addPunto=function(puntos){
            console.log(this.punto);
            console.log(puntos);
            puntos.push(this.punto);
            $http.post('http://localhost:8084/labncode/rest/servicios/laboratorio/' + laboratorio+'/enunciado/puntos',this.punto).success(function (data) {
                console.log(data);
            });
            this.punto={};
        };
    }]);

})();