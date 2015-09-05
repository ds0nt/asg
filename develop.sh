#!/bin/bash

# docker stop redis-asg
# docker rm redis-asg

docker run -d --restart=always --privileged \
  -p 6379:6379 \
  -v /var/redis-asg:/data \
  --name="redis-asg" \
  redis

# port=`docker port redis-asg | grep -oE "[0-9]+$"`

xfce4-terminal --command="/code/asg/serve.js"
xfce4-terminal --command="/code/asg/client/watch.sh"
