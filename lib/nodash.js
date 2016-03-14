/**
 * Created by blake on 3/12/16.
 */
//自己的工具库,实现自己用到的一些基本方法,而这些方法或多或少会出现在Lodash中,但自己的项目,还是以理解为主

var nodash = {
//    判断对象是否为空值{}
    isEmptyObject: (obj)=> {
        var name;
        for (name in obj) {
            if (obj.hasOwnProperty(name))
                return false;
        }
        return true;
    }
}

module.exports = exports = nodash