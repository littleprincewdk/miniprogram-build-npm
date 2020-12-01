const path = require('path');
const fs = require('fs-extra');
const rollup = require('rollup');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const ora = require('ora');
const chalk = require('chalk');

// eslint-disable-next-line import/no-dynamic-require
const pkg = require(path.join(process.cwd(), 'package.json'));

const inputPath = path.resolve('miniprogram-build-npm/index.js');

async function buildOne(dependency, options) {
  await fs.writeFile(inputPath, `export * from '${dependency}'`);

  const bundle = await rollup.rollup({
    input: inputPath,
    plugins: [nodeResolve(), commonjs()],
  });

  await bundle.write({
    file: path.resolve(options.output, dependency, 'index.js'),
    format: options.format,
    indent: false,
    sourcemap: options.sourcemap,
  });
}

async function build(options) {
  const spinner = ora('building...').start();

  // eslint-disable-next-line no-underscore-dangle
  const _options = {
    output: 'miniprogram_npm',
    format: 'cjs',
    sourcemap: false,
  };
  Object.assign(_options, options);

  if (!pkg.dependencies) {
    spinner.fail(chalk.red('build fail'));
    throw new Error('can not find dependencies!');
  }
  const dependencies = Object.keys(pkg.dependencies);

  await fs.ensureFile(inputPath);

  // eslint-disable-next-line no-restricted-syntax
  for (const dependency of dependencies) {
    // eslint-disable-next-line no-await-in-loop
    await buildOne(dependency, _options);
  }

  await fs.remove(path.resolve('miniprogram-build-npm'));

  spinner.succeed(chalk.green('build done'));
}

module.exports = build;
