/**
 * Created by blake on 3/20/16.
 */
//云服务,提供各种增删改查接口
'use strict'

var co = require('co')
const AV = require('avoscloud-sdk')
AV.initialize('eTODA7uMFLutUIPmSUCwDTtO-gzGzoHsz', 'k6EYQCPvwt67getQVxOXTS9t');

var AVClass = {Article: 'Article', Tags: 'Tags'}
var Article = AV.Object.extend(AVClass["Article"])
var articleObject = new Article()
var Tags = AV.Object.extend(AVClass["Tags"])

/**
 * 获取文章详情
 * @param id
 */
function*getArticle(id) {
    var query = new AV.Query(Article)
    var result = yield query.get(id)
    return {
        author: result.get("author"),
        title: result.get("title"),
        summary: result.get("summary"),
        tag: result.get("tag"),
        content: result.get("content"),
        createdAt: result.createdAt,
        updatedAt: result.updatedAt,
        id: result.id
    }
}

/**
 * 保存文章到LeanCloud
 */
function*saveArticle(obj) {
    return yield articleObject.save(obj)
}
/**
 * 更新文章,包括更新一些标签啊,summary啊什么的
 * @param id 要更新数据的ID
 * @param obj 更新的对象
 */
function*updateArticle(id, obj) {
    articleObject.fetchWhenSave(true)

    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            articleObject.set(key, obj[key])
        }
    }

    return yield articleObject.save()
}

/**
 * 获取文章列表,包含分页
 */
function*getArticleList(page, limit) {
    page = page || 1
    limit = limit || 10
    var query = new AV.Query(Article)
    query.select('author', 'title', 'summary', 'tag');
    query.limit(limit)
    query.skip((page - 1) * limit)
    var result = yield query.find()
    return result.map(item=> {
        return {
            author: item.get("author"),
            title: item.get("title"),
            summary: item.get("summary"),
            tag: item.get("tag"),
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
            id: item.id
        }
    })
}

/**
 * 删除
 * @param id
 */
function*removeArticle(id) {
    var query = new AV.Query(Article)
    var object = yield query.get(id)
    return yield object.destroy()
}

/**
 * 新增tag或者更新tag
 * @param tagName
 * @param id
 * @constructor
 */
function * saveTag(tagName, id) {
    return new Promise((resolve, reject)=> {
        var tagObject = new Tags()
        co(function*() {
            var query = new AV.Query(Tags)
            try {
                query.equalTo('tagName', tagName)
                var results = yield query.find()
                if (results.length !== 0) {
                    console.log(results)
                    var result = results[0]
                    result.addUnique('ids', id)
                    result = yield result.save()
                    resolve(result)
                } else {
                    tagObject.set("tagName", tagName)
                    tagObject.set("ids", [id])
                    var result = yield tagObject.save()
                    resolve(result)
                }
            } catch (e) {
                if (e.code === 101) {
                    tagObject.set("tagName", tagName)
                    tagObject.set("ids", [id])
                    var result = yield tagObject.save()
                    resolve(result)
                } else {
                    reject(e)
                }
            }
        })
    })

}

module.exports = {
    getArticle: getArticle,
    saveArticle: saveArticle,
    updateArticle: updateArticle,
    getArticleList: getArticleList,
    removeArticle: removeArticle,
    saveTag: saveTag,
    //设置对象为测试对象
    setTestArticle: function () {
        Article = AV.Object.extend("TestArticle")
        Tags = AV.Object.extend("TestTags")
        articleObject = new Article()
        tagObject = new Tags()
    }
}