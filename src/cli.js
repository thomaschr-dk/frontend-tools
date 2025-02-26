#!/usr/bin/env node
import meow from 'meow';
import chalk from 'chalk';
import { watchTask } from './tasks/watch';
import { developmentTask } from './tasks/development';
import { productionTask } from './tasks/production';

const cli = meow(
  `${chalk.bgHex('#c80046').bold('fronter')}

  ${chalk.bold('Usage')}
    $ ${chalk.bold('fronter prod')}
      Compiles and minifies your .scss and .babel.js files
    $ ${chalk.bold('fronter dev')}
      Compiles your .scss and .babel.js files with source maps
    $ ${chalk.bold('fronter watch')}
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

switch (cli.input[0]) {
  case 'prod':
    productionTask(cli.flags.lint);
    break;
  case 'dev':
    developmentTask(cli.flags.lint);
    break;
  case 'watch':
    watchTask(cli.flags.lint);
    break;
  default:
    console.log(
      chalk`{bold.red Command "${cli.input[0]}" not found. Use --help to see all available commands}`
    );
}
