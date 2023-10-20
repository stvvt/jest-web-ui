const ts_preset = require('ts-jest/presets')
const puppeteer_preset = require('jest-puppeteer/jest-preset')

module.exports = Object.assign(
  ts_preset,
  puppeteer_preset
)