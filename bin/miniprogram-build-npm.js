#!/usr/bin/env node

const { program } = require('commander');
const pkg = require('../package.json');
const build = require('../lib');

program
  .version(pkg.version)
  .option('-o, --output <string>', 'output path', 'miniprogram_npm')
  .option('-f, --format <string>', 'lib format, cjs | esm', 'cjs')
  .option('-s, --sourcemap', 'use sourcemap', false)
  .parse(process.argv);

build({
  output: program.output,
  format: program.format,
  sourcemap: program.sourcemap,
});
