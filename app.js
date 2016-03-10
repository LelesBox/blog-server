"use strict";

let rhyme = require("./lib/rhyme-core")

rhyme
    .lift(function (r) {
        console.log("bootstrap on port " + r.config.port, new Date())
    });