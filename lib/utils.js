/**
 * Created by blake on 3/14/16.
 */

var fs = require('fs')
var path = require('path')

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

/**
 *更新本地配置文件
 * @param project 配置文件所属的项目
 * @param config 配置文件对象
 */
exports.updateLocalConfig = function (project, config) {
    var ph = path.resolve(__dirname, "../" + project + "-config.json")
    try {
        var cfg = require("../" + project + "-config.json")
        cfg[config.filename] = config
        fs.writeFileSync(ph, JSON.stringify(cfg), "utf8")
    } catch (e) {
        var c = {}
        c[config.filename] = config
        fs.writeFileSync(ph, JSON.stringify(c), "utf8")
    }
}