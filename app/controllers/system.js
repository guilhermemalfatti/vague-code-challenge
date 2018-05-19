
var pjson = require('../package.json');
var responseBuilder = require("../util/responseBuilder.js");

module.exports.getVersion = function(req, res) {
    console.info('call controllers.system.getVersion');

    var body  = {
        name: pjson.name,
        version: pjson.version
    };

    responseBuilder.createResponse(res, 200, 200, body);

};

module.exports.getHealthcheck = function(req, res, next) {
    console.info('call controllers.system.getHealthcheck');

    responseBuilder.createResponse(res, 200, 200, {status: 1});
    
};