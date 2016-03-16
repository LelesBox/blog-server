/**
 * Created by blake on 3/9/16.
 */
module.exports = {
    'get /ping': function*() {
        this.body = "hello rhyme"
    },
    'get /test':function test() {
      this.body="<div>hellp</div>"
    }
}
