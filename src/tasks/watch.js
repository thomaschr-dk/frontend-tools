import chokidar from 'chokidar';
import path from 'path';
import * as sassExtract from 'sass-extract';
import chalk from 'chalk';
import sassTask from './sass';
import babelTask from './babel';

const watchTask = (files, lint = false) => {
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
  const chalkColors = {
    '.scss': 'red',
    '.js': 'yellow'
  };
  console.log(
    chalk`{bold [👀]} Watching for changes to {red .scss} and {yellow .babel.js} files...`
  );
  watcher.on('change', filePath => {
    const ext = path.extname(filePath);
    console.log(
      chalk`{bold [👀]} Change detected: {${chalkColors[ext]} ${path.basename(filePath)}}`
    );
    if (ext === '.scss') {
      Object.keys(sassDependencies).forEach(file => {
        if (sassDependencies[file].includes(filePath)) {
          sassTask(file, lint);
        }
      });
    }
    if (ext === '.js') {
      babelTask(filePath, lint);
    }
  });
};

export default watchTask;
