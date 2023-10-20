const ts_preset = require('ts-jest/jest-preset')
const puppeteer_preset = require('jest-puppeteer/jest-preset')

const preset = {
  ...ts_preset,
  ...puppeteer_preset
};

preset.setupFilesAfterEnv = [...(preset.setupFilesAfterEnv ?? []), require.resolve('./setup.ts')];

module.exports = preset;
