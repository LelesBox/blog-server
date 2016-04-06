var rhyme = require("../../lib/rhyme-core")
require('co-mocha')

before(function (done) {
    rhyme.lift(".", {
        port: 2048
    }, function (r) {
        rhyme = r
        done()
    })
})
