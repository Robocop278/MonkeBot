#!/bin/bash

git pull
pm2 stop
pm2 start bot.js --watch