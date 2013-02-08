#!/bin/bash

if [ ! -e services.json ]; then
    curl 'https://raw.github.com/didnotread/didnotread.org/master/index/services.json' \
        > services.json
fi
