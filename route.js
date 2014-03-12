var _ = require('underscore');
var uuid = require('node-uuid');
var Filer = require("./qiniu.js");
console.log(Filer)
var rooms = []

var me = {
    "id": uuid.v4(),
    "full_name": "小明",
    "email": "xiaoming@gmail.com",
    "rooms": []
};

console.log("ME:%s", me);

var users = [me];

var apps = [];

var driveStorage = {"media": {}};

(function () {
    var USER_TOTAL = 40,
        APP_TOTAL = 5,
        ROOM_TOTAL = 3;
    // init users
    _.each(_.range(USER_TOTAL), function (index) {
        var user = {
            "id": uuid.v4(),
            "user_name": "user" + uuid.v4(),
            "full_name": "小明",
            "email": "xiaoming" + index + "@gmail.com",
            "rooms": []
        };
        users.push(user);
        console.log('create user,%s', JSON.stringify(user));
    });
    // init app
    _.each(_.range(APP_TOTAL), function (index) {
        var app = {
            "id": uuid.v4(),
            "type": "web/native",
            "full_name": "提高班/有理数第" + index + "章",
            "package_name": "org.sunshine-library.org",
            "version_code": 3,
            "url": "/app/102",
            "manifest": {}
        };
        rooms.push(app);
        driveStorage[app.id] = {};
        console.log('create app,%s', JSON.stringify(app));
    });
    // init rooms
    _.each(_.range(ROOM_TOTAL), function (index) {
        var room = {
            "id": "wx01" + ("0" + index).slice(-2),
            "full_name": "高一" + index + "班",
            "school_id": "无锡",
            "school_name": "无锡",
            "members": [],
            "apps": []
        };
        _.each(_.sample(users, _.random(15)), function (user) {
            room.members.push(user);
        });
        rooms.push(room);
    });
})();

var findUserById = function (id) {
    return _.find(users, function (user) {
        return (user.id === id);
    });
}

var findRoomById = function (id) {
    return _.find(rooms, function (room) {
        return (room.id === id);
    });
}
var findAppById = function (id) {
    return _.find(apps, function (app) {
        return (app.id === id);
    });
}

exports.init = function (router) {
    /**
     * User
     **/
    router.get("/1/me", function (req, res) {
        res.send(me);
    });
    router.post("/1/me/profile", function (req, res) {
        me.profile = req.body;
        res.send(me);
    });
    router.get("/1/users", function (req, res) {
        res.send(users);
    });
    router.post("/1/users", function (req, res) {
        var newUser = req.body;
        newUser.id = uuid.v4();
        users.push(newUser);
        res.send(newUser);
    });
    router.get("/1/users/:userId", function (req, res) {
        res.send(req.user);
    });
    router.del("/1/users/:userId", function (req, res) {
        var foundIndex = -1;
        _.find(users, function (user, index) {
            if (user.id == req.params.userId) {
                foundIndex = index;
            }
        });
        if (foundIndex >= 0) {
            res.send(users.splice(foundIndex, 1));
        } else {
            res.send(404);
        }
    });

    /**
     * Room
     **/
    router.get("/1/rooms", function (req, res) {
        res.send(rooms);
    });
    router.post("/1/rooms", function (req, res) {
        var newRoom = req.body;
        newRoom.id = uuid.v4();
        users.push(newRoom);
        res.send(newRoom);
    });
    router.get("/1/rooms/:roomId", function (req, res) {
        res.send(req.room);
    });
    router.del("/1/rooms/:roomId", function (req, res) {
        var foundIndex = -1;
        _.find(rooms, function (room, index) {
            if (room.id == req.params.roomId) {
                foundIndex = index;
                return true;
            } else {
                return false;
            }
        });
        if (foundIndex >= 0) {
            res.send(rooms.splice(foundIndex, 1));
        } else {
            res.send(404);
        }
    });
    router.put("/1/rooms/:roomId/users/:userId", function (req, res) {
        req.room.members.push(req.user);
        res.send(req.room);
    });
    router.del("/1/rooms/:roomId/users/:userId", function (req, res) {
        var foundIndex = -1;
        _.each(req.room.members, function (user, index) {
            if (user.id == req.user.id) {
                foundIndex = index;
            }
        });
        if (foundIndex > 0) {
            req.room.members.splice(foundIndex, 1);
        }
        res.send(req.room);
    });

    /**
     * APP
     **/
    router.get("/1/apps", function (req, res) {
        res.send(apps);
    });
    router.post("/1/apps", function (req, res) {
        var newApp = req.body;
        newApp.id = uuid.v4();
        apps.push(newApp);
        res.send(newApp);
    });
    router.del("/1/apps/:appId", function (req, res) {
        res.send(req.app);
    });
    router.put("/1/rooms/roomId/apps/:appId", function (req, res) {
        req.room.apps.push(req.app);
        res.send(req.room);
    });
    router.del("/1/rooms/roomId/apps/:appId", function (req, res) {
        var foundIndex = -1;
        _.each(req.room.apps, function (app, index) {
            if (app.id == req.app.id) {
                foundIndex = index;
            }
        });
        if (foundIndex > 0) {
            req.room.apps.splice(foundIndex, 1);
        }
        res.send(req.room);
    });

    /**
     * Drive
     **/
    router.post("/1/drive/media/:entityId", function (req, res) {
        // upload media file
        var data = driveStorage.media[req.params.entityId] = req.body;
        res.send(data);
    });
    router.get("/1/drive/media", function (req, res) {
        res.send(driveStorage);
    });
    router.get("/1/drive/:appId/:entityId", function (req, res) {
        res.send(driveStorage[req.params.appId][req.params.entityId]);
    });
    router.post("/1/drive/:appId/:entityId", function (req, res) {
        var data = driveStorage[req.params.appId][req.params.entityId] = req.body;
        res.send(data);
    });

    /**
     * Download WPK
     **/
    router.get("/1/dl/:appId", function (req, res) {

    });

    router.param('userId', function (req, res, next, id) {
        var found = findUserById(id);
        if (found) {
            req.user = found;
            next();
        } else {
            res.send(404);
        }
    });

    router.param('roomId', function (req, res, next, id) {
        var found = findRoomById(id);
        if (found) {
            req.room = found;
            next();
        } else {
            res.send(404);
        }
    });
    router.param('appId', function (req, res, next, id) {
        var found = findAppById(id);
        if (found) {
            req.app = found;
            next();
        } else {
            res.send(404);
        }
    });

    // router.post("/save", function (req, res) {
    //     console.log('save1');
    //     var filer = new Filer({
    //         name: req.body["update"].name
    //     });
    //     console.log('save2');
    //     filer.save(function (err) {
    //         console.log('asdfsa');
    //         if (err == "false") {
    //             console.log('befor return');
    //             res.send("", {status: "false"})
    //             console.log('begin return');
    //             return
    //         }
    //         res.send("", {status: "true"});
    //         console.log('true');
    //     })
    // })
    router.post("/save", function (req, res) {
        console.log('save1');
        var filer = new Filer({
            name: req.body["update"].name
        });
        console.log('save2');
        filer.save(function (err) {
            console.log('asdfsa');
            if (err == "false") {
                console.log('befor return');
                res.send('false')
                console.log('begin return');
                return
            }
            res.send('true');
            console.log('true');
        })
    })

};
