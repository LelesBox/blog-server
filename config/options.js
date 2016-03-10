/**
 * Created by blake on 1/22/16.
 */
var path = require('path')
module.exports = {
    viewsOptions: {
        root: path.join(process.cwd(), 'views'),
        layout: 'layout',
        viewExt: 'ejs',
        cache: false,
    },
    sessionOptions: {
        key: "rhyme.sid",
        prefix: "rhyme:sess",
        cookie: {
            path: '/',
            httpOnly: true,
            maxage: null,
            rewrite: true,
            signed: true
        },
        ttl: null,
        rolling: false,
    }
}