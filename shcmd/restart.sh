#!/bin/bash

pm2 stop bot.js
pm2 start bot.js --watch