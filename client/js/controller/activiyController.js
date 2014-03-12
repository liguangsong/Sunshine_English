function ActivityController($scope, $navigate, $timeout, $routeParams) {

    $scope.new_activity = function () {
        $scope.activity_name = '';
        $('#create_activity').modal("show");
    }

    $scope.save_activity = function () {
        var activity = new Activity($scope.activity_name, $scope.type, rand_number(), $routeParams.lessonId);
        activity.save($routeParams.lessonId,init_data);
        $('#create_activity').modal("hide");
    }

    function init_data(data){
        $timeout(function(){
            $scope.activities=data.activities;
            $scope.lesson_name=data.title;
        })
    }

    $scope.back=function(){
        $navigate.go("/"+$routeParams.chapterId)
    }

    $scope.back=function(){
        $navigate.go("/"+$routeParams.chapterId);
    }

    $scope.go_to_activity=function(activity){
        $navigate.go("/"+$routeParams.chapterId+"/"+$routeParams.lessonId+"/"+activity.id+"/"+activity.type)
    }

    Activity.get_all_activity($routeParams.lessonId,init_data)

}
