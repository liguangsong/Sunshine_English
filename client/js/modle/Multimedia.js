function Multimedia() {

}

Multimedia.new_multimedia=function(body,title){
    var problem={};
    problem.title=title;
    problem.body=body;
    problem.id=rand_number();
    return problem;
}

Multimedia.get_all_multimedia = function (callback) {
    var MaterialObj = ParseObj.get_obj_collection('Material');
    MaterialObj.fetch({
        success: function (collection) {
            callback(JSON.parse(JSON.stringify(collection)));
        },
        error: function (collection, error) {
            console.log('error' + JSON.stringify(error));
        }
    })
}

Multimedia.save_multimedia = function (lessonid, activityId,interVideo) {
    var lesson = ParseObj.get_obj_query("Lesson");
    lesson.get(lessonid, {
        success: function (result) {
            var lessoner = JSON.parse(JSON.stringify(result));
            lessoner = Multimedia.get_activity_of_inter_video(lessoner["activities"], activityId,interVideo);
            result.set('activities', lessoner);
            result.save();
        },
        error: function () {
            console.log("sss")
        }
    })
}

Multimedia.get_activity_of_inter_video = function (activities, activityId,interVideo) {
    var activities_list = activities
    var i, j = activities_list.length, activity
    for (i = 0; i < j; i++) {
        if (activities_list[i].id == activityId) {
            activities_list[i].prombles = Multimedia.update(activities_list[i].prombles, interVideo);
        }
    }
    return activities_list
}

Multimedia.update=function(activity,interVideo){
    var update_type = "false"
    var problem = _.map(activity, function (list) {
        if (list.id == interVideo.id) {
            update_type = "true"
            return interVideo
        }
        return list
    })
    if (update_type == "false") problem.push(interVideo);
    return problem;

}

Multimedia.get_inter_video=function(lessonid,activityId,callback){
    var lesson = ParseObj.get_obj_query("Lesson");
    var activityId = activityId
    lesson.get(lessonid, {
        success: function (result) {
            lesson = JSON.parse(JSON.stringify(result));
            var data = Multimedia.get_inter_video_of_activity(activityId, lesson.activities)
                callback(data);
        },
        error: function () {
        }
    })
}

Multimedia.get_inter_video_of_activity=function(activityId, activities){
    var activityId = activityId;
    var quiz = _.find(activities, function (activity) {
        return activity.id == activityId
    })
    return quiz["prombles"]
}

Multimedia.save_inter_video=function(lessonid,activityId,multimedia){
    var lesson = ParseObj.get_obj_query("Lesson");
    var activityId = activityId

    lesson.get(lessonid, {
        success: function (result) {
            lesson = JSON.parse(JSON.stringify(result));
            var activities = Multimedia.update_inter_video_of_activity(activityId, lesson,multimedia)
            result.set('activities', activities);
            result.save();

        },
        error: function () {
            alert("fds")
        }
    })
}

Multimedia.update_inter_video_of_activity=function(activityId, lesson,multimedia){
    var activityId = activityId,video_of_lesson=lesson
    console.log(video_of_lesson["activities"])
    var activities = _.map(video_of_lesson["activities"], function (activity) {
        alert(activity["id"])
        alert(activityId)
        if(activity["id"]==activityId){
            activity["prombles"]=multimedia;
        }
        return  activity
    })
    return activities
}