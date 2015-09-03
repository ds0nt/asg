#!/bin/bash

cd `dirname $0`

watchman "./src" ./build.sh
