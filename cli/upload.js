/**
 * Created by blake on 4/5/16.
 */
'use strict'

const path = require('path')
const fs = require('fs')
const CloudService = require('../service/CloudService')
const co = require('co')

const config = require('../blog/blog-config.json')

var updateData = config.latest


co(function* () {
    let item
    for (let i = 0; i < updateData.length; i++) {
        item = updateData[i]
        var result = yield syncToCloud(item)
        result = yield CloudService.saveArticle(result)
        var id = result.id
        for (let j = 0; j < item.tag.length; j++) {
            yield CloudService.saveTag(item.tag[j], id)
            console.log(item.tag[j])
        }
    }
    console.log("成功!")
}).catch(e=> {
    console.log(e)
})


function syncToCloud(item) {
    var obj = {}
    return new Promise((resolve, reject)=> {
        var filepath = path.resolve(__dirname, "../blog/" + item.filename)
        fs.readFile(filepath, 'utf8', (err, data)=> {
            if (err) {
                return reject(err)
            }
            obj['content'] = data
            obj = {
                content: data,
                imageurl: item.iamge,
                title: item.title,
                author: item.author,
                summary: item.summary,
                tag: item.tag
            }
            resolve(obj)
        })
    })
}


function syncTagToCloud(id, tags) {

}