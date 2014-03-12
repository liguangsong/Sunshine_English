myModule.config(function ($routeProvider) {
    $routeProvider.when("/", {
//        templateUrl: "pages/test.html",
//        controller: test
        templateUrl: "page/video.html",
        controller: videoController
    }).when("/chapter", {
            templateUrl: "page/chapter.html",
            controller: ChapterController
        }).when("/:chapterId", {
            templateUrl: "page/lesson.html",
            controller: LessonController
        }).when("/:chapterId/:lessonId", {
            templateUrl: "page/activity.html",
            controller: ActivityController
        }).when("/:chapterId/:lessonId/:activityId/quiz", {
            templateUrl: "page/quiz.html",
            controller: QuizController
        }).when("/:chapterId/:lessonId/:activityId/interactive_video", {
            templateUrl: "page/inter_video.html",
            controller: InterVideoController
        }).when("/:chapterId/:lessonId/:activityId/lecture", {
            templateUrl: "page/Lecture.html",
            controller: LectureController
        })

});