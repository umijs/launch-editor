# [WIP] launch-editor

[![Coverage Status](https://coveralls.io/repos/github/umijs/launch-editor/badge.svg?branch=master)](https://coveralls.io/github/umijs/launch-editor?branch=master) [![NPM version](https://img.shields.io/npm/v/@umijs/launch-editor.svg?style=flat)](https://npmjs.org/package/@umijs/launch-editor) [![NPM downloads](http://img.shields.io/npm/dm/@umijs/launch-editor.svg?style=flat)](https://npmjs.org/package/@umijs/launch-editor)

✏️ Launch your code editor using Node.js.

## Feature
- [ ] support `async/await`
- [ ] error handlers and codes
- [ ] support more editors and platforms.
- [ ] specify the editor to launch


## Install

```sh
$ npm install @umijs/launch-editor -S
```

## Usage

Commonjs

```js
const launchEditor = require('@umijs/launch-editor');

(async () => {
  try {
    await launchEditor(config)
  } catch (e) {}
})()

```

ES6 / TypeScript

```js
import launchEditor from '@umijs/launch-editor';

(async () => {
  try {
    await launchEditor(config)
  } catch (e) {}
})()
```

Configuration

### launchEditor(path, [options]): Promise<void>

#### path

Type: `string` | `object` | `Array<string | object>`

files or project path you want to open in the editor.

#### options

Type: `object`

##### editor
Type: `string`
Default: Auto-detected (current process or existed editors, envs)

the function return a `Promise`, if having an error when launching the editor, there are some error `code` and `description`, `editor` (if you specify) you might use.

| code | description |
|--------|------|
| `EPERM` | the path is permission denied |
| `UNKNOWN` | couldn't find your editor, might not install |
| `OTHER` | unknown error couldn't catch |

## Development

```sh
$ npm install
$ npm run dev
```

## Test

```sh
$ npm install
$ npm run test
```

##

### Supported editors

| Value | Editor | Linux | Windows | OSX |
|--------|------|:------:|:------:|:------:|
| `code` | [Visual Studio Code](https://code.visualstudio.com/) ||||
| `atom` | [Atom](https://atom.io/) ||||
| `code` | [Visual Studio Code](https://code.visualstudio.com/) ||||
| `atom` | [Atom](https://atom.io/) ||||
| `code-insiders` | [Visual Studio Code Insiders](https://code.visualstudio.com/insiders/) ||||
| `sublime` | [Sublime Text](https://www.sublimetext.com/) ||||
| `webstorm` | [WebStorm](https://www.jetbrains.com/webstorm/) ||||
| `idea` | [IDEA](https://www.jetbrains.com/idea/) ||||
