function InterVideoController($scope, $timeout, $routeParams, $navigate) {
    $scope.insert_media = function () {
        $('#inter_active').modal('show');
        Multimedia.get_all_multimedia(init_data);
    }
    Multimedia.get_inter_video($routeParams.lessonId, $routeParams.activityId, init_video);
    function get_file_type() {
        var rads = document.getElementsByName("radio"),
            i;
        for (i = 0; i < rads.length; i++)
            if (rads[i].checked)
                return rads[i].value;
    }

    $scope.upload = function () {
        var file_path = document.getElementById("file").value;
        var file_type = get_file_type()
        if (_.find($scope.videos, function (video) {
            return video == get_file_name(file_path);
        })) {
            var file = {"name": get_file_name(file_path), 'type': file_type};
            if (file.name != undefined) {
                var MaterialObj = ParseObj.get_parse_obj('Material');
                MaterialObj.save(file, {
                    success: function (data) {
                        Multimedia.get_all_multimedia(init_data);
                    },
                    error: function (data, error) {
                        console.log('error' + JSON.stringify(error));
                    }
                })
            } else {
                alert("请选择文件！！")
            }
        } else {
            alert("该文件已存在")
        }
    }

    $scope.click = function (object) {
        var id = object.objectId;
        if (document.getElementById(id).style.backgroundColor == "rgb(135, 174, 197)") {
            document.getElementById(id).style.backgroundColor = "";
            $scope.file = "";
        } else {
            $("#inter_active_list li").each(function () {
                this.style.backgroundColor = ""
            })
            document.getElementById(id).style.backgroundColor = "#87AEC5"
            $scope.file = object;
        }
    }

    function init_data(data) {
        $timeout(function () {
            $scope.videos = data;
        })
    }

    function init_video(data) {
        $timeout(function () {
            if (data == undefined) {
                $scope.body = data.body;
            } else {
                $scope.body = [];
            }
            $scope.inter_video_title = data.title;
            _.map($scope.body, function (list) {
                var file = "http://fristtry.qiniudn.com/" + list.name
                if (list.type == "video") {
                    $('#video').append('<video src=' + file + '></video>')
                } else {
                    $('#video').append('<img src=' + file + '></img>')
                }
            })
        })
    }

    $scope.insert = function () {
        if ($scope.file != "") {
            $timeout(function () {
                var file = "http://fristtry.qiniudn.com/" + $scope.file.name
                append_multimedia($scope.file.type, file)
                $scope.body.push($scope.file)
                $("#inter_active").modal("hide");
            })
        } else {
            alert("请选择要添加的文件名")
        }
    }

    $scope.cancel_save = function () {
        $("#inter_active").modal("hide");
    }

    $scope.new_interVideo = function () {
        var multimedia = Multimedia.new_multimedia($scope.body, $scope.inter_video_title)
        Multimedia.save_inter_video($routeParams.lessonId, $routeParams.activityId, multimedia)
    }

    $scope.back = function () {
        $navigate.go("/" + $routeParams.chapterId + "/" + $routeParams.lessonId)
    }

    function get_file_name(url) {
        for (var i = url.length; i >= 0; --i) {
            if (url[i] === '\\') {
                return url.substr(i + 1);
            }
        }
    }

    function append_multimedia(type, file) {
        if (type == "video") {
            $('#video').append('<video src=' + file + '></video>')
        } else {
            $('#video').append('<img src=' + file + '></img>')
        }
    }
}