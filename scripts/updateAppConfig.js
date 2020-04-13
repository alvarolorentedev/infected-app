#!/usr/bin/env node

const fs = require('fs')
const file = require('../app.json')
const currentVersion = file.expo.version.split('.')

//UPDATE VERSION
file.expo.version = `${currentVersion[0]}.${currentVersion[1]}.${process.env.GITHUB_RUN_NUMBER}`

//SETUP SECRETS
file.expo.extra.prod.SERVER_URL = process.env.SERVER_URL
file.expo.extra.prod.SERVER_USERNAME = process.env.SERVER_USERNAME
file.expo.extra.prod.SERVER_PASSWORD = process.env.SERVER_PASSWORD

fs.writeFileSync('app.json', JSON.stringify(file))