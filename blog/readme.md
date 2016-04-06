# 我的博客开发实践

> 要想实践新技术，还得靠`side project`,前端变幻莫测，出来点新技术随便试试demo，发现效果不错，但却无处可用，得找个能真正实践的地方，所以才有了开发个人博客的想法，况且，作为前端，天天跟web前端网页打交道的人，自己写一个博客网站真是再正常不过的锻炼方式了。

![public-domain-images-free-stock-photos-high-quality-resolution-downloads-public-domain-archive-3](http://7xqkyz.com1.z0.glb.clouddn.com/2016-04-03-public-domain-images-free-stock-photos-high-quality-resolution-downloads-public-domain-archive-3.jpg)￼

### 0 自问自答:为什么不用Ghost，Jeklly等静态网站生成

*对于一个不经常写博客的人来说，开发博客比写博客有乐趣多了，况且，作为前端，天天跟web前端网页打交道的人，自己写一个博客网站真是再正常不过的锻炼方式了*

## 1 技术选型

### 0 后台

根据自己的计划，打算前后端一起写，后端用nodejs搭建reset服务提供给前端单页应用调用，直到后来种种原因，本地启用一个后台保存数据并提供API接口对于一台只有512M内存，5G硬盘的VPS主机来说，生怕本地再起一个mongodb服务器会吃力，所以就开始寻找云存储服务，物色了七牛和leancloud，毫无疑问，熟悉mongodb的更偏leancloud的模式，默认存储结构基本都是mongodb的数据类型，还提供了丰富的接口，简洁的SDK，简直是不二之选，顺便吐槽一下还有一家类似leancloud的公司叫bomb，细心一看，JS SDK的文档跟leancloud家几乎一模一样，如出一辙，一字不差。然而它家的免费存储有30G....,甚至还让我稍有心动。不管怎么说，选择leancloud最为云存储真是极好的。

leancloud本身是提供jssdk的，可以很方便的集成在前端代码里，甚至后端。那我为什么还要经过后端去转一下呢，多此一举，直接在前端js里使用sdk实现增删改查就行啦，后端和前端的区别无非就是前端调用需要填写一下安全域名，除此之外，毫无区别。所以我放弃了后端担任API接口的角色，全面使用leancloud的sdk，开发纯纯的单页应用。那还需要服务器吗？。。。当然需要啦，node后端当静态服务器哇。毕竟单页应用也要服务器才能运行好么。

### 1 前台

前端框架选型为react，因为angular已经接触过一点，vue也有用于实际工作，所以理所当然的选择了另一门很热门的前端全家桶（单使用react怎么能够用，还得用它的周边），对于前端框架，选择webpack，私以为光是配置工程都会让自己抓耳挠腮，因为实在是太繁琐太不知所措了，所以前端模板是一个不错的选择，其中yo最有代表性，可以一键生成前端工程，并且能直接npm start运行，但这里我选择了TJ大神的[frontend-boilerplate](https://github.com/tj/frontend-boilerplate)作为模板，至于为什么选择它，也许因为tj在node界的地位吧。

```javascript
/**
 * Created by blake on 4/2/16.
 */

var hyperdown = require("hyperdown")
var fs = require('fs')
var Parser = new hyperdown()


var result = fs.readFileSync('test.md', 'utf-8')

var html = Parser.makeHtml(result)

console.log(html)

fs.writeFileSync('test.html', html)

console.log("完成")
```