/**
 * Created by blake on 3/9/16.
 */
module.exports = {
    hook: function*() {
        var pushObj = this.request.body
        console.log(pushObj)
        if (pushObj) {
            var commits = pushObj.commits
            commits.forEach((item) = {})
        }
        this.body = "git hook"
    }
}

//根据added,removed,modified三个行为返回数据

function filestat(item) {
    if (item.added.length > 0) {

    }
    if (item.modified.length > 0) {

    }
    if (item.removed.length > 0) {

    }
}