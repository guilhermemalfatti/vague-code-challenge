var responseBuilder = require("../util/responseBuilder.js");

//dumb validation
exports.bodyValidate = function(req, res, next) {
   
    if(!req.params.role){
        responseBuilder.createErrorResponse(res, 400, 400, "Missing mandatory body parameters");
        return;
    }
    
    if(!req.params.name){
        responseBuilder.createErrorResponse(res, 400, 400, "Missing mandatory body parameters");
        return;
    }

    return next();    
};