#!/usr/bin/env bash

#接受参数指定上传那个文件或者文件夹,如果没有指定则上传整个文件夹

scp -v -P 27096 ./* root@23.83.238.9:/usr/src/workspace/blog