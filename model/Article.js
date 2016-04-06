/**
 * Created by blake on 3/20/16.
 */
var BaseModel = require("./BaseModel")


module.exports = new BaseModel({
    Name: "Article",
    attributes: {
        author: "string",
        title: {
            required: true,
            type: "String"
        },
        summary: "String",
        tag: "Array",
        image: "String",
        content: {
            type: "String",
            required: true
        },
        updatedAt: "Date",
        createdAt: "Date"
    }
})