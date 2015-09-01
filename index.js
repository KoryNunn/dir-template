var fs = require('fs-extra'),
    path = require('path'),
    waitFor = require('wait-for');

function template(map, currentPath, after){
    for(var key in map){
        var dirPath = path.join(currentPath, key);

        fs.mkdirs(dirPath, after(function(){
            template(map[key], dirPath, after);
        }));
    }
}

function dirTemplate(map, currentPath, done){
    if(typeof currentPath === 'function'){
        done = currentPath;
        currentPath = null;
    }
    currentPath = currentPath || process.cwd();

    var after = waitFor(done);

    template(map, currentPath, after);
}

module.exports = dirTemplate;
