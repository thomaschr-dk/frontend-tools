import chokidar from 'chokidar';
import path from 'path';
import chalk from 'chalk';
import { sassTask } from './sass';
import { babelTask } from './babel';
import { getCssFiles, getJsFiles } from '../utils/file-getter';
import { buildSassDependencies } from '../utils/sass-dependency-builder';
import chalkColors from '../config/chalk-colors.json';

const watchTask = (lint = false) => {
  process.env.NODE_ENV = 'development';
  const files = [...getCssFiles(), ...getJsFiles()];

  process.chdir(__dirname);
  const sassDependencies = buildSassDependencies(files);
  const watcher = chokidar.watch(files, {
    awaitWriteFinish: {
      stabilityThreshold: 250
    }
  });
  console.log(
    chalk`{bold [👀]} Watching for changes to {${chalkColors['.scss']} .scss} and {${chalkColors['.js']} .babel.js} files...`
  );

  watcher.on('change', filePath => {
    const extension = path.extname(filePath);
    console.log(
      chalk`{bold [👀]} Change detected: {${chalkColors[extension]} ${path.basename(filePath)}}`
    );

    switch (extension) {
      case '.scss':
        Object.keys(sassDependencies).forEach(scssFile => {
          if (sassDependencies[scssFile].includes(filePath)) {
            sassTask(scssFile, lint);
          }
        });
        break;
      case '.js':
        babelTask(filePath, lint);
        break;
      default:
        console.log(chalk`{bold [👀]} {red Error: No actions for ${extension} files set up.}`);
    }
  });
};

export { watchTask };
