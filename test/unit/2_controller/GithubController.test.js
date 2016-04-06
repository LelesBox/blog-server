//var supertest = require("supertest")
//var should = require('should')
//var co = require("co")
//var fs = require('fs')
//var path = require('path')
//var mockdata = require('../../mock-data')
//
//
//describe("test github hook", function () {
//
//    var request = supertest("localhost:1024")
//
//    it("test analyze commit", function (done) {
//        request.post('/hook/github')
//            .send(mockdata.pushData)
//            .set("contentType", "application/json")
//            .set("User-Agent", "GitHub-Hookshot/7a65dd9")
//            .set("X-GitHub-Event", "push")
//            .expect(200, function (err, response) {
//                console.log(response.text)
//                done()
//            })
//    })
//
//    it("一样的文件名的commit会被覆盖", function (done) {
//        request.post('/hook/github')
//            .send(mockdata.pushData2)
//            .set("contentType", "application/json")
//            .set("User-Agent", "GitHub-Hookshot/7a65dd9")
//            .set("X-GitHub-Event", "push")
//            .expect(200, function (err, response) {
//                console.log(response.text)
//                done()
//            })
//    })
//
//    it("第二条commit,文件名不一样,保存到本地", function (done) {
//        request.post('/hook/github')
//            .send(mockdata.pushData3)
//            .set("contentType", "application/json")
//            .set("User-Agent", "GitHub-Hookshot/7a65dd9")
//            .set("X-GitHub-Event", "push")
//            .expect(200, function (err, response) {
//                console.log(response.text)
//                done()
//            })
//    })
//})