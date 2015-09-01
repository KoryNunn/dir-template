var mockFs = require('mock-fs'),
    test = require('tape'),
    dirTemplate = require('../'),
    kgo = require('kgo'),
    rimraf = require('rimraf'),
    fs = require('graceful-fs');

// this doesn't seem to work with graceful-fs..
//mockFs();

function cleanup(a, done){
    rimraf.sync('things');
}

kgo

('1', function(done){
    test('creates new shallow structure', function(t){
        t.plan(1);

        dirTemplate({
            'things': {}
        }, fs.stat.bind(fs, './things', function(error, stats){
            if(error){
                t.fail();
            }else{
                t.ok(stats.isDirectory());
            }
            cleanup();
            done();
        }));
    });
})
('2', ['1'], function(nothing, done){
    test('creates new deep structure', function(t){
        t.plan(2);

        dirTemplate({
            'things': {
                'stuff': {
                    'whatever':{},
                    'dooby':{}
                }
            }
        }, function(){
            var whateverStat = fs.statSync('./things/stuff/whatever')
            var doobieStat = fs.statSync('./things/stuff/whatever')

            t.ok(whateverStat.isDirectory());
            t.ok(doobieStat.isDirectory());

            cleanup();
            done();
        });
    });
})
('3', ['2'], function(nothing, done){
    test('creates at a different path', function(t){
        t.plan(1);

        dirTemplate({
            'things': null
        }, function(){
            dirTemplate({
                'stuff': {
                    'whatever':{},
                    'dooby':{}
                }
            }, './things', fs.stat.bind(fs, './things/stuff/whatever', function(error, stats){
                 if(error){
                    t.fail(error);
                }else{
                    t.ok(stats.isDirectory());
                }
                cleanup();
                done();
            }));
        });
    });
})
