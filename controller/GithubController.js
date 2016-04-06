/**
 * Created by blake on 3/9/16.
 */
'use strict';

const nodash = require('../lib/nodash')
const PinYin = require('../lib/pinyin')
const utils = require('../lib/utils')

module.exports = {
    hook: function*() {
        var pushObj = this.request.body
        if (!nodash.isEmptyObject(pushObj)) {
            var commits = pushObj.head_commit
            AnalyzeHeadCommit(commits)
        }
        this.body = "git hook"
    }
}

//根据added,removed,modified三个行为返回数据

function Getfilestat(item) {
    var stat = {}
    if (item.removed.length > 0) {
        stat["status"] = 'removed'
        stat["filename"] = item.removed[0]
    }
    if (item.added.length > 0) {
        stat["status"] = 'added'
        stat["filename"] = item.added[0]
    }
    if (item.modified.length > 0) {
        stat["status"] = 'modified'
        stat["filename"] = item.modified[0]
    }
    return stat
}

// message 格式如："t[readme test aka] s[什么，这是summary的写法？] title[一只宅男的自我修养]"
function AnalyzeMessage(message) {
    var tstitle = {};
    var trgx = /t\[(.*?)\]/;
    var srgx = /s\[(.*?)\]/;
    var titlergx = /title\[(.*?)\]/;
    var tags = trgx.exec(message);
    if (tags) {
        tstitle["tag"] = tags[1].split(" ")
    }
    var summary = srgx.exec(message);
    if (summary) {
        tstitle["summary"] = summary[1];
    }
    var title = titlergx.exec(message)
    if (title) {
        tstitle["title"] = title[1];
    }
    return tstitle;
}

// 处理head_commit,提取出必要信息,并保存到本地文件
function AnalyzeHeadCommit(commit) {
    let config = {}
    // 提取文件名
    let filestat = Getfilestat(commit)
    // 分离文件名的后缀,并用pinyin转移成拼音
    let filekey = PinYin(filestat.filename.substr(0, filestat.filename.indexOf(".")) || filestat.filename)
    if (filestat.status === 'removed') {
        // 移除配置文件中该文件的记录
    } else {
        let author = commit.author.username;
        let updateDateTime = commit.timestamp;
        let tstile = AnalyzeMessage(commit.message)
        config = {
            author: author,
            updateDateTime: updateDateTime,
            title: tstile.title,
            filename: filestat.filename,
            summary: tstile.summary,
            tag: tstile.tag
        }
    }
    utils.updateLocalConfig("blog", config)
    console.log(config)
}
