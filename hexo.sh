#!/bin/bash

docker container rm hexo

containerName="hexo"

docker run --rm -it -p 4000:4000 \
    -v $(pwd):/home/hexo/blog \
    -e HTTP_PROXY=http://172.170.1:7890 \
    -e HTTPS_PROXY=http://172.17.0.1:7890 \
    -e NO_PROXY=localhost,127.0.0.1,172.17.0.* \
    --name ${containerName} ${containerName} \
    /bin/bash 