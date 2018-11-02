#!/usr/bin/env bash
ALIVE=`ps aux | grep -c "[n]ode bin/runner.js"`
if [ ${ALIVE}  -eq 0 ]; then
echo bad
        exit 1
fi
exit 0
