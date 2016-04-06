"use strict";

let rhyme = require("./lib/rhyme-core")()
var log = require('./lib/log')
var utils = require('./lib/utils')

// logger
rhyme.use(function *(next) {
    var start = new Date
    yield next
    var ms = new Date - start
    var req = this.req
    var ip = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
    log.info(this.method, this.url, this.response.status, "ip " + ip, ms + "ms", utils.beijingTime())
})

//error handling
rhyme.use(function* (next) {
    try {
        yield* next;
    } catch (e) {
        this.body = this.util.format.Common('error', e.toString() + "\n" + e.stack);
    }
})

rhyme.on('error', function (e) {
    log.error(e)
})

rhyme.lift(function (r) {
    console.log("bootstrap on port " + r.config.port, new Date())
});