#!/usr/bin/env node

const { program } = require('commander');
const pkg = require('../package.json');
const build = require('../lib');

function collect(value, previous) {
  const [key, val] = value.split('=');
  // eslint-disable-next-line no-param-reassign
  previous[key] = val;
  return previous;
}

program
  .version(pkg.version)
  .option('-o, --output <string>', 'output path', 'miniprogram_npm')
  .option('-f, --format <string>', 'lib format, cjs | esm', 'cjs')
  .option('-s, --sourcemap', 'use sourcemap', false)
  .option('-r, --replace <string>', 'replace strings in files while bundling', collect, {})
  .parse(process.argv);

build({
  output: program.output,
  format: program.format,
  sourcemap: program.sourcemap,
  replace: program.replace,
});
