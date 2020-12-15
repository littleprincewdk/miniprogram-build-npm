# miniprogram-build-npm

小程序[npm支持](https://developers.weixin.qq.com/miniprogram/dev/devtools/npm.html)的改进版。

## Why?

开发者工具自带的【构建 npm】不支持`tree-shaking`, 拿`redux@3.6.0`为例，`v3.6.0`的`redux`引入了`lodash/isPlainObject`, 结果构建npm后整个`lodash`都被构建进了`miniprogram_npm`。此库就是为了解决此问题。

## Usage

```bash
$ yarn add miniprogram-build-npm -D
```

```json
{
  "scripts": {
    "build-npm": "miniprogram-build-npm"
  }
}
```

```bash
$ npm run build-npm
```

## Options

### `--output`/`-o`

Type: `string` Default: `miniprogram_npm`

构建输出路径

```bash
$ miniprogram-build-npm --output libs
```

### `--format`/`-f`

Type: `cjs | esm` Default: `cjs`

输出模块格式：
- `cjs` - CommonJS
- `esm` - ES, 使用此格式可以配合【ES6转ES5】使用

具体输出格式需要看引入的包支持不支持相关格式，如果包本身发布时只发布了`es5`的格式，那么即使指定`esm`也无效，会原样打包

```bash
miniprogram-build-npm --format esm
```

### `--sourcemap`/`-s`

Type: `boolean` Default: `false`

开启`sourcemap`

```bash
miniprogram-build-npm --sourcemap
```

### `--replace`/`-r`

Type: `object` Default: `{}`

see [@rollup/plugin-replace](https://github.com/rollup/plugins/tree/master/packages/replace)

```bash
miniprogram-build-npm --replace process.env.NODE_ENV=production --replace foo=bar
```

## API

除了作为命令行使用，还可以使用api调用

```javascript
const build = require('miniprogram-build-npm');

build({
  output: 'libs',
  format: 'esm',
  sourcemap: false,
  replace: {
    'process.env.NODE_ENV': JSON.stringify('ENV'),
  }
});
```
