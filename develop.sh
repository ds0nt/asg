#!/bin/bash

# docker stop redis-asg
# docker rm redis-asg

docker run -d --restart=always --privileged -p 6379:6379 -v /var/redis-asg:/data --name="redis-asg" redis

sleep 2
port=`docker port redis-asg | grep -oE "[0-9]+$"`

echo $port

./serve.js "redis://127.0.0.1:$port"


