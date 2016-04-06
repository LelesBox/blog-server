/**
 * Created by blake on 3/17/16.
 */

'use strict'

const readline = require('readline');
const path = require('path')
const rl = readline.createInterface(process.stdin, process.stdout);
const fs = require('fs')
const CloudService = require('../service/CloudService')
const co = require('co')

const step = ["filename", "title", "author", "tag", "summary", "imageurl"]
var obj = {}
var i = 0;
rl.setPrompt(step[i] + " > ");
rl.prompt();

rl.on('line', (line) => {
    obj[step[i]] = line.trim()
    i++
    if (i === step.length) {
        for (var key in obj) {
            if (key === 'tag') {
                obj.tag = obj.tag.split(",")
            }
            if (key === 'filename') {
                obj['content'] = fs.readFileSync(path.resolve(__dirname, "../blog/" + obj.filename), 'utf8')
                delete obj.filename
            }
        }
        console.log("sending to leancloud....")
        co(function*() {
            var result = yield CloudService.saveArticle(obj)
            var id = result.id
            console.log("save tag")
            for (let j = 0; j < obj.tag.length; j++) {
                var t = obj.tag[j]
                yield CloudService.saveTag(t, id)
            }

        }).catch(e=> {
            console.log(e.stack)
        })
    } else {
        rl.setPrompt(step[i] + " > ");
        rl.prompt();
    }
}).on('close', () => {
    console.log('\n\n end! Have a great day!');
    process.exit(0);
});

