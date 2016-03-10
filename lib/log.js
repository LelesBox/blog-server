/**
 * Created by blake on 1/26/16.
 */
var colors = require('colors')
var themes = {
    silly: 'rainbow',
    input: 'grey',
    verbose: 'cyan',
    prompt: 'red',
    info: 'green',
    data: 'blue',
    help: 'cyan',
    warn: 'yellow',
    debug: 'magenta',
    error: 'red'
}

colors.setTheme(themes);

var log = {}
for (var t in themes) {
    (function (theme) {
        log[theme] = function () {
            var args = Array.prototype.slice.call(arguments, 0)
            args.unshift(theme + ":")
            for (var i = 0; i < args.length; i++) {
                var a = args[i]
                if (typeof a === 'object') {
                    if (a.stack)//错误类型取错误栈
                        args[i] = (a.toString() + "\n" + a.stack)[theme]
                    else if (a.getDate)//日期类型不处理
                        continue
                    else
                        args[i] = JSON.stringify(a)[theme]
                } else if (typeof a === 'number') {
                    args[i] = (a + "")[theme]
                } else if (typeof a === 'string') {
                    args[i] = a[theme]
                }
            }
            console.log.apply(this, args)
        }
    }(t))
}
log.color = themes
module.exports = log;
