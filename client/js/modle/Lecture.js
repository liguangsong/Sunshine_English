function Lecture() {

}

Lecture.save_lecture = function (lessonId, lecture) {
    var lesson = ParseObj.get_obj_query("Lesson");
    lesson.get(lessonId, {
        success: function (result) {
            var lessoner = JSON.parse(JSON.stringify(result));
            lessoner = Lecture.get_activity_of_quiz(lessoner["activities"], lecture);
            result.set('activities', lessoner);
            result.save();
        },
        error: function () {
            console.log("sss")
        }
    })
}

Lecture.get_activity_of_quiz = function (activities, question) {
    activities.push(question);
    console.log(activities)
    return activities
}

Lecture.get_all_lecture=function(lessonid,activityid,callback){
    var lesson = ParseObj.get_obj_query("Lesson");

    lesson.get(lessonid, {
        success: function (result) {
            lesson = JSON.parse(JSON.stringify(result));
            var data = Quiz.get_quiz_of_activity(activityid, lesson.activities)
            console.log(data)
            callback(data)
        },
        error: function () {
        }
    })
}