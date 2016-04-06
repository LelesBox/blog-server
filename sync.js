/**
 * Created by blake on 3/17/16.
 */
var shell = require('shelljs')
var argv = require('yargs').argv;


if (argv.file) {
    shell.exec("echo upload " + argv.file)
    shell.exec("scp -v -P 27096 blog/" + argv.file + " root@23.83.238.9:/usr/src/workspace/blog-server/blog");
} else {
    shell.exec("echo 上传当前文件夹")
    shell.exec("scp -v -P 27096 blog/* root@23.83.238.9:/usr/src/workspace/blog-server/blog")
}