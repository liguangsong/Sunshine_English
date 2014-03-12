function LectureController($scope, $navigate, $timeout, $routeParams) {
    $scope.add = function () {
        $("#inter_video").modal("show");
    }

    $scope.add_choice = function () {
        Choice.add_choice()
    }

    $scope.save_quiz = function () {
        var answer = Choice.get_checkbox_value();
        var choices = Choice.get_input_value();
        choices=Choice.create_choices(answer,choices)
        var lecture = Choice.create_lecture(choices, $scope.show_time, $routeParams.lessonId);
        Lecture.save_lecture($routeParams.lessonId, lecture)
        $("#inter_video").modal("hide");
    }

    $scope.cancel = function () {
        $("#inter_video").modal("hide");
    }

    Lecture.get_all_lecture($routeParams.lessonId,$routeParams.activityId,init_data);

    function init_data(data){
        console.log(data)
    }
}