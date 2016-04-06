/**
 * Created by blake on 3/20/16.
 */
'use strict'

const is = require('is_js')
//    创建基础对象,继承该对象的所有方法
//    方法包括,属性值检验
class BaseModel {
    //接受一个对象,该对象为具体包含属性的对象
    constructor(model) {
        this.model = model

    }

//    要有验证方法
    validate(obj) {
        for (var key in this.model.attributes) {
            if (this.model.attributes.hasOwnProperty(key)) {
                var attr = this.model.attributes[key]
                if (typeof attr === 'string' && obj[key] && !is[attr.toLowerCase()](obj[key])) {
                    throw new Error("the " + this.model.Name + "Model property " + key + " type not match, it should be " +
                        attr + " but here is " + typeof obj[key])
                }
                if (attr.required && !obj[key]) {
                    throw new Error("the " + this.model.Name + " Object missing " + key + " property")
                }
                if (attr.type && !is[attr.type.toLowerCase()](obj[key])) {
                    throw new Error("the " + this.model.Name + "Model property " + key + "type not match, it should be " +
                        attr.type + " but here is " + typeof obj[key])
                }
            }
        }
    }
}

module.exports = exports = BaseModel