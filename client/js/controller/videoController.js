function videoController($scope){
   $scope.img=[{name:"图片",src:"./public/img/e.jpg"},{name:"图片",src:"./public/img/e.jpg"},{name:"图片",src:"./public/img/e.jpg"}]
//    var GameScore = Parse.Object.extend("GameScore");
//    var gameScore = new GameScore();
//    gameScore.set("score", 1337);
//    gameScore.set("playerName", "Sean Plott");
//    gameScore.set("cheatMode", false);
//    gameScore.save(null, {
//        success: function(gameScore) {
//            alert('New object created with objectId: ' + gameScore.id);
//        },
//        error: function(gameScore, error) {
//            console.log("ddd")
//            alert('Failed to create new object, with error code: ' + error.description);
//        }
//    });
//    var GameScore = Parse.Object.extend("GameScore2");
//    var gameScore = new GameScore();
//
//    gameScore.save({
//        score: 1337,
//        playerName: "Sean Plott",
//        cheatMode: false
//    }, {
//        success: function(gameScore) {
//        },
//        error: function(gameScore, error) {
//
//        }
////    });
    var GameScore = Parse.Object.extend("Post");
    var query = new Parse.Query(GameScore);
//    var Post = Parse.Object.extend("Post");
//
//    query.get("8zRhgE7MIc", {
//        success: function(gameScore) {
////            var post = new Post();
////
////        post.id = "xBhn1tWELf";
////
////        gameScore.set("parent", post);
////        gameScore.save()
//            console.log(gameScore.id)
//            var post = gameScore.get("parent");
//            console.log(post.id)
//            post.fetch({
//                success: function(post) {
//                    var title = post.get("title");
//                }
//            });
//        },
//        error: function(object, error) {
//        }
//    });
//    gameScore.fetch({
//        success: function(myObject) {
//            console.log(myObject)
//        },
//        error: function(myObject, error) {
//            console.log("dfd")
//        }
//    });
//    gameScore.addUnique("skills", "flying");
//    gameScore.addUnique("skills", "kungfu");
//    gameScore.save();
    // Create the object.
//    var GameScore = Parse.Object.extend("GameScoreli");
//    var query = new Parse.Query(GameScore);
//      query.get("SaFv7O1RH4" ,{
//        success: function(gameScore) {
//            console.log("sdfds")
//            // After this, the playerName field will be empty
//            gameScore.unset("playerName");
//
//// Saves the field deletion to the Parse Cloud
//            gameScore.save()
//        },
//        error: function(object, error) {
//        }
//    });

//
//    gameScore.destroy({
//        success: function(myObject) {
//            // The object was deleted from the Parse Cloud.
//        },
//        error: function(myObject, error) {
//            // The delete failed.
//            // error is a Parse.Error with an error code and description.
//        }
//    });

//    gameScore.increment("score");
//    gameScore.save();
    // Declare the types.
//    var Post = Parse.Object.extend("Post");
//    var Comment = Parse.Object.extend("Comment");
////
////// Create the post
//    var myPost = new Post();
//    myPost.set("title", "I'm Hungry");
//    myPost.set("content", "Where should we go for lunch?");
////
////// Create the comment
//    var myComment = new Comment();
//    myComment.set("content", "Let's do Sushirrito.");
////
//// Add the post as a value in the comment
//    myComment.set("parent", myPost);
//
//// This will save both myPost and myComment
//    myComment.save()
//    var post = .get("parent");
//    post.fetch({
//        success: function(post) {
//
//            var title = post.get("title");
//            console.log(title)
//        }
//    });
//    var post = new Post();
//    post.id = "1zEcyElZ80";
//
//    myComment.set("parent", post);
//    var user = Parse.User.current();
//    var relation = user.relation("Post");
//    relation.add(post);
//    user.save();

//    var query = relation.query();
//    query.equalTo("title", "I'm Hungry");
//    query.find({
//
//        success:function(list) {
//            // list contains post liked by the current user which have the title "I'm Hungry".
//        console.log(list)
//        }
//    });
//    var number = 42;
//    var string = "the number is " + number;
//    var date = new Date();
//    var array = [string, number];
//    var object = { number: number, string: string };
//
//    var BigObject = Parse.Object.extend("BigObject");
//    var bigObject = new BigObject();
//    bigObject.set("myNumber", number);
//    bigObject.set("myString", string);
//    bigObject.set("myDate", date);
//    bigObject.set("myArray", array);
//    bigObject.set("myObject", object);
//    bigObject.set("myNull", null);
//    bigObject.save();
//    var GameScore = Parse.Object.extend("Comment");
//    var query = new Parse.Query(GameScore);
//    query.limit(1);
////    query.equalTo("content", "Let's do Sushirrito.");
//    query.notEqualTo("content", "Let's do Sushirritgo.");
//    query.find({
//        success: function(results) {
//            alert("Successfully retrieved " + results.length + " scores.");
//            // Do something with the returned Parse.Object values
//            for (var i = 0; i < results.length; i++) {
//                var object = results[i];
//                alert(object.id + ' - ' + object.get('content'));
//            }
//        },
//        error: function(error) {
//            alert("Error: " + error.code + " " + error.message);
//        }
//    });
}