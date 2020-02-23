import chokidar from 'chokidar';
import path from 'path';
import * as sassExtract from 'sass-extract';
import chalk from 'chalk';
import sass from './sass';
import babel from './babel';

const watch = files => {
  const sassDependencies = {};
  files.forEach(file => {
    if (path.extname(file) === '.scss') {
      const rendered = sassExtract.renderSync({
        file
      });
      sassDependencies[file] = rendered.stats.includedFiles;
    }
  });
  const watcher = chokidar.watch(files);
  console.log(chalk.bold(`👀 Watching for changes to .scss and .babel.js files`));
  watcher.on('change', filePath => {
    if (path.extname(filePath) === '.scss') {
      Object.keys(sassDependencies).forEach(file => {
        if (sassDependencies[file].includes(path.resolve(filePath))) {
          sass(file);
        }
      });
    }

    if (path.extname(filePath) === '.js') {
      babel(filePath);
    }
  });
};

export default watch;
