function Multimedia (){

}

Multimedia.get_all_multimedia=function(callback){
    var MaterialObj = ParseObj.get_obj_collection('Material');
    MaterialObj.fetch({
        success: function(collection){
            callback(JSON.parse(JSON.stringify(collection)));
        },
        error: function(collection, error){
            console.log('error' + JSON.stringify(error));
        }
    })
}