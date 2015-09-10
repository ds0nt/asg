#!/bin/bash

cd $(dirname $0)

PATH=../node_modules/.bin:$PATH

export NODE_ENV=development
export API="http://localhost:8080"

boom() {
  zenity --notification --title="Message" --text="`cat -`" 2>/dev/null
}

browserify -d src/app.js -t babelify -o dist/app.js -v 2> >(boom)
myth src/app.css dist/app.css 2> >(boom)
