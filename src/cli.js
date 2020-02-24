#!/usr/bin/env node
import meow from 'meow';
import glob from 'glob';
import chalk from 'chalk';
import path from 'path';
import sassTask from './tasks/sass';
import babelTask from './tasks/babel';
import watch from './tasks/watch';

const cli = meow(
  `${chalk.bgHex('#c80046').bold('fronter')}

  ${chalk.bold('Usage')}
    $ ${chalk.bold('front-styles prod')}
      Compiles and minifies your .scss and .babel.js files
    $ ${chalk.bold('front-styles dev')}
      Compiles your .scss and .babel.js files with source maps
    $ ${chalk.bold('front-styles watch')}
      Watches and compiles your .scss and .babel.js files on change with source maps`,
  {
    flags: {
      lint: {
        type: 'boolean',
        alias: 'l'
      }
    }
  }
);

const globOptions = {
  ignore: ['requirejs-config.js', 'node_modules'],
  realpath: true
};
const cssFiles = glob.sync('**/*.scss', globOptions);
const jsFiles = glob.sync('**/*.babel.js', globOptions);
process.chdir(path.dirname(__dirname));
process.env.NODE_ENV = 'development';
switch (cli.input[0]) {
  case 'prod':
    process.env.NODE_ENV = 'production';
    cssFiles.forEach(cssFile => sassTask(cssFile, cli.flags.lint));
    jsFiles.forEach(jsFile => babelTask(jsFile, cli.flags.lint));
    break;
  case 'dev':
    cssFiles.forEach(cssFile => sassTask(cssFile, cli.flags.lint));
    jsFiles.forEach(jsFile => babelTask(jsFile, cli.flags.lint));
    break;
  case 'watch':
    watch([...cssFiles, ...jsFiles], cli.flags.lint);
    break;
  default:
    console.log(
      chalk`{bold.red Command "${cli.input[0]}" not found. Use --help to see all available commands}`
    );
}
