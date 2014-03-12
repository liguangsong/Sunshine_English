function ParseObj () {
}

ParseObj.get_obj_query = function(type){
    var Obj = Parse.Object.extend(type);
    return new Parse.Query(Obj);
}

ParseObj.get_parse_obj=function(type){
    var Obj= Parse.Object.extend(type);
    return   new Obj();
}

ParseObj.get_obj_collection = function(type){
    var Obj = Parse.Object.extend(type);
    var ObjCollection = Parse.Collection.extend({
        model: Obj
    });
    return new ObjCollection();
}