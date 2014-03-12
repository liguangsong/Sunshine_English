function QuizController($scope, $navigate, $timeout, $routeParams){
    function init_data(data){
      $timeout(function(){
          $scope.quiz=data;
          $scope.problems=data["prombles"]
          console.log(data.prombles)
      })
    }

    $scope.select_type=function(type){
        $scope.cancel_create()
        $('#create_quiz').modal("show");
        $scope.type = (type=="radio"? "single":"multiple");
    }

    $scope.multiple_add_choice=function(){
        Choice.add_choice();
    }

    $scope.save_choice=function(){
        var answers = Choice.get_checkbox_value();
        var choices = Choice.get_input_value();
        choices = Choice.create_choices(answers, choices);
        var question=Choice.create_question(choices,$scope.multiple_title,$scope.multiple_body,$scope.type,$routeParams.lessonId)
        Quiz.save_quiz($routeParams.lessonId,$routeParams.activityId,question)
    }

    $scope.back=function(){
        $navigate.go("/"+$routeParams.chapterId+"/"+$routeParams.lessonId)
    }

    $scope.problem_editor=function(problem){
        $('#create_quiz').modal("show");
        $scope.type = (problem.type=="single"? "single":"multiple");
        $scope.multiple_title=problem.title;
        $scope.multiple_body=problem.body;
        $scope.choices=problem.choices;
        $scope.$watch(Choice.show_answer,$('#multiple').modal('show'));
    }

    $scope.insert_media=function(){

    }

    $scope.cancel_create=function(){
        $scope.type = "";
        $scope.multiple_title="";
        $scope.multiple_body="";
        $scope.choices="";
        $("#create_quiz").modal("hide");
    }

    Quiz.get_activity($routeParams.lessonId,$routeParams.activityId,init_data);

}