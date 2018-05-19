module.exports.copyObject = function copyObject(obj) {
    var result = (obj instanceof Array) ? [] : {};
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) {
            continue;
        }
        var value = obj[i];
        result[i] = typeof value == 'object' ? copyObject(value) : value;
    }
    return result;
}