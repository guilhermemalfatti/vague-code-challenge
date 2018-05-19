var test = require('tape');
var proxyquire = require('proxyquire');
var util = require('./util/index.js');

var proxyquireMocks = {
    '../util/responseBuilder.js': {        
        createResponse: function (a, b, c, d) {
            return;
        }        
    }
};

test('Get healtcheck', function(t){
    t.plan(4);

    var res = "My response";
    var req = {};
    var body = {status : 1};
    
    var localMocks = util.copyObject(proxyquireMocks);
    var responseBuilder = localMocks['../util/responseBuilder.js'];
    responseBuilder.createResponse = function (a, b, c, d) {
        t.equal(a, res, 'Response should be as defined');
        t.equal(b, 200, 'Status should be 200');
        t.equal(c, 200, 'HTTP Status should be 200');
        t.deepEqual(body, d, 'Body should be as expected');
    };

    var system = proxyquire('../controllers/system.js', localMocks);
    system.getHealthcheck(req, res);
});



test('Get Version', function(t){
    var pjson = require('../package.json');
    t.plan(4);

    var res = "My response";
    var req = {};
    var body  = {
        name: pjson.name,
        version: pjson.version
    };
    
    var localMocks = util.copyObject(proxyquireMocks);
    var responseBuilder = localMocks['../util/responseBuilder.js'];
    responseBuilder.createResponse = function (a, b, c, d) {
        t.equal(a, res, 'Response should be as defined');
        t.equal(b, 200, 'Status should be 200');
        t.equal(c, 200, 'HTTP Status should be 200');
        t.deepEqual(body, d, 'Body should be as expected');
    };

    var system = proxyquire('../controllers/system.js', localMocks);
    system.getVersion(req, res);
}); 