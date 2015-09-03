#!/bin/bash

cd $(dirname $0)

PATH=../node_modules/.bin:$PATH

export NODE_ENV=development
export API="http://localhost:8080"

browserify -d src/app.js -t babelify -o dist/app.js -v
echo Done generating app.js

myth src/app.css dist/app.css
echo Done generating app.css

echo Done building
