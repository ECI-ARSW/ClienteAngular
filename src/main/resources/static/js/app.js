(function () {
    var laboratorio ="ARSW-Lab";
    var app = angular.module("estudiante", []);

    app.controller("LabController", function(){
        this.setLab= function (lab) {
            laboratorio = lab;
        };
        this.getLaboratorio = function () {
            return laboratorio;
        };

    });
	
	app.controller("TabController", ['$http', function($http) {
		this.tab=1;

		this.setTab = function(tab) {
			this.tab=tab;
		}

		this.isSet = function(tab){
			return this.tab === tab;
		};
        var enunciado = this;

        enunciado.puntos=[];
        $http.get('http://localhost:8084/labncode/rest/servicios/laboratorio/'+laboratorio+'/enunciado').success(function(data){
            console.log(data);
            //enunciado.puntos=;
        })

	}]);

})();