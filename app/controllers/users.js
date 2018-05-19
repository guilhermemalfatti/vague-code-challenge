var database = require('../util/database.js');
var redisCache = require('../util/redis.js');
var responseBuilder = require("../util/responseBuilder");

//using redis to cache informtions
module.exports.retriveUsers =  function (req, res) {
    var pool = database.getConnection();
    var prefix = 'user-role-';
    var fields = ['id', 'name', 'role'];

    redisCache.getValue(prefix + req.params.role, undefined, function(err, results){
        if(err){
            console.log("redis error: " + err.message);
        }else{
            if(results){
                responseBuilder.createResponse(res, 200, 200, JSON.parse(results));
            }else{
                pool.selectFromTable(fields, 'users', 'role = "' + req.params.role + '"', function(error, results){
                    if(error){
                        responseBuilder.createErrorResponse(res, 500, 500, error.sqlMessage);
                    }else{
                        if(results.length > 0){
                            redisCache.setValue(prefix + req.params.role, JSON.stringify(results), function(){
                                responseBuilder.createResponse(res, 200, 200, results);
                            });                        
                        }else{
                            responseBuilder.createErrorResponse(res, 404, 200, 'User not found.');
                        }
                    }
                });
            }            
        }
    });

  
}
module.exports.createUsers = function (req, res) {
    var pool = database.getConnection();
    var post = {name: req.params.name, 
        role: req.params.role,
        };
    var fields = ['name','role'];

    pool.insertRows([post],'users', fields, function (error, results) {
        if (error){
            responseBuilder.createErrorResponse(res, 500, 500, error.sqlMessage);
        }else{
            responseBuilder.createResponse(res, 200, 200, {quote: results.insertId});
        }
    });
}
