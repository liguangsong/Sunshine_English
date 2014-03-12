function LessonController($scope,$timeout,$routeParams,$navigate) {

    function get_chapter_name(data){
        $timeout(function(){
            $scope.chapter_name=data;
        })
        Lesson.get_all_lesson(data,init_data)
    }

    function init_data(data){
        $timeout(function(){
            $scope.lessons=data;
            $('#create_lesson').modal('hide');
        })
    }

    $scope.new_Lesson = function () {
        $scope.lesson_name = "";
        $('#create_lesson').modal('show');
    }

    $scope.save_lesson = function () {
        var lesson = new Lesson($scope.lesson_name,$scope.chapter_name);
        lesson.save_lesson(init_data);
        $("#create_lesson").modal('hide');
    }

    $scope.go_to_lesson=function(lessonid){
     $navigate.go("/"+$routeParams.chapterId+"/"+lessonid)
    }

    $scope.back=function(){
        $navigate.go("/chapter")
    }

    Chapter.get_chapter_from_id($routeParams.chapterId,get_chapter_name)

}