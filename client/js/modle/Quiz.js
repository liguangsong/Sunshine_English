function Quiz() {

}

Quiz.get_activity = function (lessonid, activityId, callback) {
    var lesson = ParseObj.get_obj_query("Lesson");
    var activityId = activityId
    lesson.get(lessonid, {
        success: function (result) {
            lesson = JSON.parse(JSON.stringify(result));
            var data = Quiz.get_quiz_of_activity(activityId, lesson.activities)
            callback(data)
        },
        error: function () {
        }
    })
}

Quiz.get_quiz_of_activity = function (activityId, data) {
    var activityId = activityId;
    console.log(data)
    var quiz = _.find(data, function (activity) {
        console.log(activityId)
        return activity.id == activityId
    })
    return quiz
}

Quiz.save_quiz = function (lessonid, activityId, question) {
    var lesson = ParseObj.get_obj_query("Lesson");
    var activityId = activityId;
    var question = question;
    var lessonid = lessonid;
    lesson.get(lessonid, {
        success: function (result) {
            var lessoner = JSON.parse(JSON.stringify(result));
            console.log(lessoner)
            lessoner = Quiz.get_activity_of_quiz(lessoner["activities"], activityId, question);
            console.log(lessoner)
            result.set('activities', lessoner);
            result.save();
        },
        error: function () {
            console.log("sss")
        }
    })
}

Quiz.get_activity_of_quiz = function (activities, activityId, question) {
    var activities_list=activities
    var i,j=activities_list.length,activity
    for(i=0;i<j;i++){
       if(activities_list[i].id==activityId){
           activities_list[i].prombles=Quiz.update(activities_list[i].prombles,question);
       }
    }
    return activities_list
}

Quiz.update = function (activity, question) {
    var a = "false"
    var problem = _.map(activity, function (list) {
        if (list.id == question.id) {
            a = "true"
            return question
        }
        return list
    })
    if (a == "false") problem.push(question);
    return problem;

}
