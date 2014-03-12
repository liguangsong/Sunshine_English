function Lesson(lesson_name,chapter_name) {
    this.title = lesson_name;
    this.chapter = chapter_name;
    this.activities = [];
}

Lesson.prototype.save_lesson = function (chapter,callback) {
    var lesson = ParseObj.get_parse_obj('Lesson');
    lesson.save(this,{
        success: function () {
            Lesson.get_all_lesson(chapter,callback);
        },
        error: function (chapter, error) {
            console.log('error' + JSON.stringify(error));
        }

    })
}

Lesson.get_all_lesson=function(chapter,callback){
    var LessonQuery = ParseObj.get_obj_query('Lesson');
    LessonQuery.equalTo('chapter', chapter);
    LessonQuery.find({
        success: function(result){
            var data = JSON.parse(JSON.stringify(result));
            callback(data);
        },
        error: function(error){
            console.log('error' + error.code + '  ' + error.message);
        }
    });
}