var test = require('tape');
var proxyquire = require('proxyquire');
var util = require('./util/index.js');

var proxyquireMocks = {
    '../util/responseBuilder.js': {        
        createResponse: function (a, b, c, d) {
            return;
        },
        createErrorResponse: function(a, b, c, d){
            return;
        }        
    }
};

test('Get validate', function(t){
    t.plan(1);

    var res = "My response";
    var req = {
        params:{
            role: "bar",
            name: "foo"
        }
    };
    
    var callback = function(){
        t.equal(1,1, 'Callback should be called');
    }

    var validator = require('../validators/validate.js');
    validator.bodyValidate(req, res, callback);
});
test('Get validate fail', function(t){
    t.plan(4);

    var res = "My response";
    var req = {
        params:{
            role: "",
            name: "foo"
        }
    };
    var body = 'Missing mandatory body parameters';
    
    var localMocks = util.copyObject(proxyquireMocks);
    var responseBuilder = localMocks['../util/responseBuilder.js'];
    responseBuilder.createErrorResponse = function (a, b, c, d) {
        t.equal(a, res, 'Response should be as defined');
        t.equal(b, 400, 'Status should be 200');
        t.equal(c, 400, 'HTTP Status should be 200');
        t.equal(body, d, 'Body should be as expected');
    };
   

    var validator = proxyquire('../validators/validate.js', localMocks);
    validator.bodyValidate(req, res);
});

