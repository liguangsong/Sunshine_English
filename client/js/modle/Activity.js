function Activity(title,type,id,parent_id){
    this.title=title;
    this.type=type;
    this.redoable="";
    this.body="";
    this.id=id;
    this.parent_id=parent_id;
    this.prombles=[];
    this.randomize_questions="";
    this.randomize_choices="";
    this.show_answer="";
    this.show_summary="";
}

Activity.get_all_activity=function(lessonId,callback){
    var lesson=ParseObj.get_obj_query("Lesson");
//    lesson.equalTo('parent_id',lessonId);
    lesson.get(lessonId,{
        success:function(result){
            var data= JSON.parse(JSON.stringify(result))
            callback(data)
        },
        error:function(error){
            console.log('error' + error.code + '  ' + error.message);
        }
    })
}

Activity.prototype.save=function(lessonId,callback){
    var activity=this;
    var LessonQuery = ParseObj.get_obj_query('Lesson');
    LessonQuery.get(lessonId, {
        success: function (data) {
            data.addUnique('activities',activity);
            data.save();
            callback(data.get('activities'));
        },
        error: function (data, error) {
            console.log('error' + JSON.stringify(error));
        }
    })
}

