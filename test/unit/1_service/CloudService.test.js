/**
 * Created by blake on 3/20/16.
 */
var should = require('should')

var object = {
    author: "LelesBox",
    title: "Just Test",
    summary: "这只是一个单纯的测试案例,很纯洁,只有18岁哦",
    tag: ["initial", "嗨起来"],
    content: "这是一段正文内容"
}

describe("测试CloudService,这个方法主要用于数据在LeanCloud的增删改查", function () {
    before(function () {
        CloudService.setTestArticle()
    })

    it("新增一条数据", function*() {

        rhyme.model.Article.validate(object)
        try {
            //新增
            var result = yield CloudService.saveArticle(object)
            //查
            result = yield CloudService.getArticle(result.id)
            console.log(result)
            //查-返回首页列表,忽略正文
            var list = yield CloudService.getArticleList()
            //改
            result = yield CloudService.updateArticle(result.id, {author: "LeeBox"})
            //删
            result = yield CloudService.removeArticle(result.id)
            //console.log(result)
            yield CloudService.getArticle(result.id)
        } catch (e) {
            //再查无此人
            e.message.should.equal("Object not found.")
        }
    })
})