#!/usr/bin/env bash

command_exists() {
    type "$1" &> /dev/null
}

if command_exists docker-machine; then
    eval $(docker-machine env default)
fi

docker run --rm -v `pwd`:/tmp joergpatz/phantomjs webshoot.js $1 $2 $3
