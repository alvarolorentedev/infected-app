#!/usr/bin/env node

if(!process.env.GITHUB_BUILD_ID || !process.env.SERVER_URL || !process.env.SERVER_USERNAME || !process.env.SERVER_PASSWORD || !process.env.LOGS_SUBDOMAIN || process.env.LOGS_INPUT_TOKEN)
    throw new Error(`Not all necessary variables are declared: GITHUB_RUN_ID = ${!process.env.GITHUB_BUILD_ID}, SERVER_URL = ${!!process.env.SERVER_URL}, SERVER_USERNAME = ${!process.env.SERVER_USERNAME}, SERVER_PASSWORD = ${!process.env.SERVER_PASSWORD}, LOGS_SUBDOMAIN = ${!process.env.LOGS_SUBDOMAIN}, LOGS_INPUT_TOKEN = ${!process.env.LOGS_INPUT_TOKEN}`)

const fs = require('fs')
const file = require('../app.json')
const currentVersion = file.expo.version.split('.')

//UPDATE VERSION
file.expo.version = `${currentVersion[0]}.${currentVersion[1]}.${process.env.GITHUB_BUILD_ID}`

//SETUP SECRETS
file.expo.extra.prod.SERVER_URL = process.env.SERVER_URL
file.expo.extra.prod.USERNAME = process.env.SERVER_USERNAME
file.expo.extra.prod.PASSWORD = process.env.SERVER_PASSWORD
file.expo.extra.prod.LOGS_SUBDOMAIN = process.env.LOGS_SUBDOMAIN
file.expo.extra.prod.LOGS_INPUT_TOKEN = process.env.LOGS_INPUT_TOKEN

fs.writeFileSync('app.json', JSON.stringify(file))