"use strict";

let rhyme = require("./lib/rhyme-core")

rhyme
    .lift({port: 1024},
        function (r) {
            console.log("bootstrap on port " + r.config.port, new Date())
        });