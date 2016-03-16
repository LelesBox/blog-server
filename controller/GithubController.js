/**
 * Created by blake on 3/9/16.
 */
'use strict';

const nodash = require('../lib/nodash')
const PinYin = require('../lib/pinyin')

module.exports = {
  hook: function*() {
    var pushObj = this.request.body
    console.log(pushObj)
    if (!nodash.isEmptyObject(pushObj)) {
      var commits = pushObj.commits
      console.log(commits)
        //commits.forEach((item) = {})
    }
    this.body = "git hook"
  }
}

//根据added,removed,modified三个行为返回数据

function filestat(item) {
  var stat = {}
  if (item.removed.length > 0) {
    stat["status"] = 'removed'
    stat["filename"] = getTitleName(item.removed[0])
  }
  if (item.added.length > 0) {
    stat["status"] = 'added'
    stat["filename"] = getTitleName(item.added[0])
  }
  if (item.modified.length > 0) {
    stat["status"] = 'modified'
    stat["filename"] = getTitleName(item.modified[0])
  }
  return stat
}

// 从文件路径中提取文件名
function getTitleName(path) {
  var ps = path.split("/")
  var filename = ""
  if (ps.length > 1) {
    filename = ps[ps.length - 1]
  } else {
    filename = ps[0]
  }
  // 去除后缀
  return filename.substr(0, filename.indexOf(".")) || filename
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
  let filestat = filestat(commit)
    // 分离文件名的后缀,并用pinyin转移成拼音
  let filekey = pinyin(filestat.filename.substr(0, filestat.filename.indexOf(".")) || filestat.filename)
  if (filestat.status === 'removed') {
    // 移除配置文件中该文件的记录
  } else {
    let author = commit.author.username;
    let updateDateTime = commit.timestamp;
    let title = filestat.filename.substr(0, filestat.filename.indexOf(".")) || filestat.filename
    let tstile = AnalyzeMessage(commit.message)
    config[filekey] = {
      author: author,
      updateDateTime: updateDateTime,
      filename: filestat.filename,
      summary:
    }
  }
}
