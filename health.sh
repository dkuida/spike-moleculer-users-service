#!/usr/bin/env bash
ALIVE=`ps aux | grep -c "[n]ode bin/runner.js"`
if [ "$?" -eq 0 ]; then
        exit 1
fi
exit 0
