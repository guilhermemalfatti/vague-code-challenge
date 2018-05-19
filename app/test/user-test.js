var test = require('tape');
var proxyquire = require('proxyquire');
var util = require('./util/index.js');

var proxyquireMocks = {
    '../util/responseBuilder.js': {        
        createResponse: function (a, b, c, d) {
            return;
        }        
    },
    '../util/redis.js':{
        setValue: function(a,b,callback){
            callback();
            return;
        },
        getValue: function(a,b,callback){
            callback();
            return;
        }
    },
    '../util/database.js':{
        getConnection: function(){
            return {
                selectFromTable: function(a,b,c,callback){
                    callback(undefined, [1]);
                    return;
                },
                insertRows: function(a,b,c,callback){
                    callback(undefined, {insertId:1});
                    return;
                }
            };
        }
    }
};

test('Post createUsers', function(t){
    t.plan(4);

    var res = "My response";
    var req = {
        params: {
            name: 'name',
            role: 'role'
        }
    };
    var body = {userid : 1};
    
    var localMocks = util.copyObject(proxyquireMocks);
    var responseBuilder = localMocks['../util/responseBuilder.js'];
    responseBuilder.createResponse = function (a, b, c, d) {
        t.equal(a, res, 'Response should be as defined');
        t.equal(b, 200, 'Status should be 200');
        t.equal(c, 200, 'HTTP Status should be 200');
        t.deepEqual(body, d, 'Body should be as expected');
    };

    var system = proxyquire('../controllers/users.js', localMocks);
    system.createUsers(req, res);
});

//shoul be testes all cases, no just the happy path
test('Get retriveUsers', function(t){
    t.plan(4);

    var res = "My response";
    var req = {
        params: {
            role: 'role'
        }
    };
    var body = {userid : 1};
    
    var localMocks = util.copyObject(proxyquireMocks);
    var responseBuilder = localMocks['../util/responseBuilder.js'];
    responseBuilder.createResponse = function (a, b, c, d) {
        t.equal(a, res, 'Response should be as defined');
        t.equal(b, 200, 'Status should be 200');
        t.equal(c, 200, 'HTTP Status should be 200');
        t.deepEqual([1], d, 'Body should be as expected');
    };

    var system = proxyquire('../controllers/users.js', localMocks);
    system.retriveUsers(req, res);
});