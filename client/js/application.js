var myModule = angular.module('myApp', ['mobile-navigate']);

myModule.run(function ($route, $http, $templateCache) {
    angular.forEach($route.routes, function (r) {
        if (r.templateUrl) {
            $http.get(r.templateUrl, {cache: $templateCache});
        }
    });
});

myModule.filter('modify', function () {
    var modify = function (word) {
        var the_first_letter = word.substring(0, 1);
        var the_other_letter = word.substring(1);
        return the_first_letter.toUpperCase() + the_other_letter;
    }
    return modify;
});

function rand_number() {
    var a = new Date();
    return a.getTime();
}