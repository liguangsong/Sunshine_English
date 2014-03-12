var qiniu = require('node-qiniu');
var fs = require('fs');
qiniu.config({
    access_key: '0qdQkJdpfpqNu59_4Ytq7UnvWlx-SOZ5TobYYAwi',
    secret_key: 'j2v3HB_P6N5ncQHzvWnFyWfTXbjP76IEew9k8O3S'
});

var imagesBucket = qiniu.bucket('fristtry');
var dirname = __dirname + '/materials/'
console.log(dirname);

function Filer(filer) {
    this.name = filer.name.toString();
};

module.exports = Filer;

Filer.prototype.save = function (callback) {
    console.log('in save');
    var res = [] , name = this.name, status = "false", files = fs.readdirSync(dirname);
    console.log(dirname);
    files.forEach(function (file) {
        console.log(file);
        if (file == name) {
            console.log('find data');
            imagesBucket.putFile(name, dirname + name, function () {
                callback(status);
            })
            status = "true"
        }
    });
    if (status == "false") {
        console.log('end');
        callback(status)
    }
    console.log('over'); 
}


