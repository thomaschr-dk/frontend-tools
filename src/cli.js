#!/usr/bin/env node
import meow from 'meow';
import glob from 'glob';
import chalk from 'chalk';
import sassTask from './tasks/sass';
import babelTask from './tasks/babel';
import watch from './tasks/watch';

const cli = meow(
  `${chalk.bgHex('#c80046').bold('FrontendTools')}

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
  ignore: ['requirejs-config.js', 'node_modules']
};
const cssFiles = glob.sync('**/*.scss', globOptions);
const jsFiles = glob.sync('**/*.babel.js', globOptions);

process.env.NODE_ENV = 'development';
switch (cli.input[0]) {
  case 'prod':
    process.env.NODE_ENV = 'production';
    cssFiles.map(cssFile => sassTask(cssFile));
    jsFiles.map(jsFile => babelTask(jsFile));
    break;
  case 'dev':
    cssFiles.map(cssFile => sassTask(cssFile));
    jsFiles.map(jsFile => babelTask(jsFile));
    break;
  case 'watch':
    watch([...cssFiles, ...jsFiles]);
    break;
  default:
    console.log(
      chalk`{bold.red Command "${cli.input[0]}" not found. Use --help to see all available commands}`
    );
}
