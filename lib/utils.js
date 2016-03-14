/**
 * Created by blake on 3/14/16.
 */
exports.beijingTime = function () {
    var d = new Date()
    var localTime = d.getTime()
    var localOffset = d.getTimezoneOffset() * 60000
    var utc = localOffset + localTime
//    北京属于东八区 +8
    var offset = 8
    var beijing = utc + (3600000 * offset)
    return new Date(beijing)
}