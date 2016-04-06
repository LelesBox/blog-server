/**
 * Created by blake on 3/21/16.
 */
'use strict'
module.exports = {
    list: function*() {
        var page = 1, limit = 10
        if (this.request.query) {
            page = this.request.query.page || page
            limit = this.request.query.limit || limit
        }
        this.body = rhyme.util.format.Common('ok', yield CloudService.getArticleList(page, limit))
    },
    article: function*() {
        if (this.params) {
            var id = this.params.id
            this.body = rhyme.util.format.Common('ok', yield CloudService.getArticle(id))
        } else {
            throw new Error("404")
        }
    }
}