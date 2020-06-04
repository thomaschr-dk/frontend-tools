# fronter

**Compile frontend assets without hassle.**

fronter is a Node.js CLI tool that helps you with building your frontend assets quickly, meaning you don't have to configure anything.

## Installation

The tool can be installed using NPM, either per project or globally.

### Project installation

```
Install the tool
$ npm install thomaschr-dk/fronter

Build assets for production
$ ./node_modules/thomaschr-dk-fronter/dist/cli.js prod
```

### Global installation

```
Install the tool globally
$ npm install -g thomaschr-dk/fronter

Build assets for production in project directory
$ cd /projects/frontend-site
$ fronter prod
```

## About

Simply run the tool in your current project directory, and it will find and compile all your .babel.js and .scss files to files that are compatible with all browsers.

The tool uses @babel/preset-env to compile JavaScript, and PostCSS to compile SCSS.

## Usage

### CLI commands

#### dev [--lint]

Compiles assets to files with inline source maps.

#### prod [--lint]

Compiles assets to minified files without source maps.

#### watch [--lint]

Compiles assets on file change. Compiled files are identical to files compiled using the `dev` command.

### Flags

- --lint or --l
  Enables ESLint and stylelint.

  Files will only be compiled if code is valid, otherwise lint messages will be shown.
