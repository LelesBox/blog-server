/**
 * Created by blake on 3/17/16.
 */
'use strict'
const AV = require('avoscloud-sdk')
const CloudService = require('../service/CloudService')
var co = require('co')
AV.initialize('eTODA7uMFLutUIPmSUCwDTtO-gzGzoHsz', 'k6EYQCPvwt67getQVxOXTS9t');

var Test = AV.Object.extend("test")
var testObject = new Test()

var query = new AV.Query(Test)

var tag = ["123", "Angel"]

query.equalTo('tagName', tag[0])

co(function*() {
    yield CloudService.saveTag("testTag", "alasfhadfj")
    yield CloudService.saveTag("testTag", "a111111")
    console.log("保存成功.....")
    //try {
    //    var results = yield query.find()
    //    var result = results[0]
    //    console.log(result)
    //    var id = result.id
    //    result.fetchWhenSave(true)
    //    result.addUnique('ids', "yaoiq3r983kjdfiydfndf000x=")
    //    result = yield result.save()
    //    console.log("更新成功...")
    //    console.log(result.get("ids"))
    //} catch (e) {
    //    console.log(e)
    //    if (e.code === 101) {
    //        testObject.set("tagName", tag[0])
    //        testObject.set("ids", ["asfaervafe0qwer813e"])
    //        yield testObject.save()
    //        console.log("保存成功....")
    //    }
    //}
}).catch(e=> {
    console.error(e)
})