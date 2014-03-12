function ChapterController($scope,$timeout,$navigate){
    function init_data(data){
       $timeout(function(){
               $scope.chapters=data;
               $("#create_chapter").modal("hide");
           }),0}

    $scope.new_chapter=function(){
        $scope.chapter_name="";
        $('#create_chapter').modal('show');
    }

    $scope.save_chapter=function(){
        var chapter=new Chapter($scope.chapter_name);
        alert('sdf')
        chapter.save_lesson($scope.chapter_name,init_data);
        alert("d")
        $('#create_chapter').modal("hide");
    }

    $scope.cancel_save=function(){
        $scope.chapter_name="";
        $('#create_chapter').modal("hide");
    }

    $scope.go_to_chapter_page=function(chapterId){
        $navigate.go('/' + chapterId, 'slide', 'left')
    }

    Chapter.get_all_chapter(init_data)
}