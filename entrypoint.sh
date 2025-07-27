#!/bin/sh
node /app/dist/main & exec nginx -g "daemon off;"