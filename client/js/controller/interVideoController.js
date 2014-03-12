function InterVideoController($scope, $timeout) {
    $scope.insert_media = function () {
        $('#inter_active').modal('show');
        Multimedia.get_all_multimedia(init_data);
    }

    function get_file_type(){
        var rads = document.getElementsByName("radio"),
            i;
        for (i=0; i < rads.length; i++)
            if (rads[i].checked)
                return rads[i].value;
    }

    $scope.upload = function () {
        var file_path = document.getElementById("file").value;
        var file_type=get_file_type()
        if (_.find($scope.videos, function (video) {
            return video == get_file_name(file_path);
        })) {
            var file = {"name": get_file_name(file_path),'type':file_type};
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
            $scope.file = object.name
        }
    }

    function init_data(data) {
        $timeout(function () {
            $scope.videos = data;
            $scope.body=[];
        })
    }

    $scope.insert = function () {
        if($scope.file!=""){
            $timeout(function () {
                var file = "http://fristtry.qiniudn.com/"+$scope.file
                $('#video').append('<img src=' + file + '></img>');
                $scope.body.push(file)
                $("#inter_active").modal("hide");
            })
        }else{
            alert("请选择要添加的文件名")
        }
    }

    $scope.cancel_save=function(){
        $("#inter_active").modal("hide");
    }

    function get_file_name(url) {
        for (var i = url.length; i >= 0; --i) {
            if (url[i] === '\\') {
                return url.substr(i + 1);
            }
        }
    }

}