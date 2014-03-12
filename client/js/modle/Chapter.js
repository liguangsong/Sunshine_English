function Chapter(name) {
    this.name = name;
    this.lesson = [];
}

Chapter.prototype.save_lesson = function (callback) {
    var chapter = ParseObj.get_parse_obj('Chapter');
    chapter.save(this, {
            success: function (chapter) {
                console.log(chapter)
                Chapter.get_all_chapter(callback);
            },
            error: function (chapter, error) {
                console.log('error' + JSON.stringify(error));
            }
      });
}

Chapter.get_all_chapter=function(callback){
   var chapter=ParseObj.get_obj_collection("Chapter");
    chapter.fetch({
        success: function(collection){
            callback(JSON.parse(JSON.stringify(collection)));
        },
        error: function(collection, error){
            console.log('error' + JSON.stringify(error));
        }
    })
}

Chapter.get_chapter_from_id=function(chapterId,callback){
    var ChapterQuery = ParseObj.get_obj_query('Chapter');
    ChapterQuery.get(chapterId,{
        success: function(data){
            callback(data.get('name'));
        },
        error: function(data, error){
            console.log('error' + error);
        }
    })
}

