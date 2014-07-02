var fs = require('fs'),
    path = require('path'),
    waitFor = require('wait-for');

function template(map, currentPath, after){
    for(var key in map){
        var dirPath = path.join(currentPath, key);

        fs.mkdir(dirPath, after(function(){
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