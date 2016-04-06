/**
 * Created by blake on 3/21/16.
 */
//统一格式,返回的格式,错误的格式
'use strict'
function Common(type, message) {
    var obj = {
        errNum: "",
        data: "",
        errMsg: ""
    }
    if (type === 'error') {
        obj.errNum = 1
        obj.data = ""
        obj.errMsg = message
    } else if (type === 'ok') {
        obj.errNum = 0
        obj.data = message
        obj.errMsg = ""
    }
    return obj;
}


module.exports = {
    Common: Common
}