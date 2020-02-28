import { getCssFiles, getJsFiles } from '../utils/file-getter';
import { sassTask } from './sass';
import { babelTask } from './babel';

const developmentTask = (lint = false) => {
  process.env.NODE_ENV = 'development';
  const cssFiles = getCssFiles();
  const jsFiles = getJsFiles();

  process.chdir(__dirname);
  cssFiles.forEach(cssFile => sassTask(cssFile, lint));
  jsFiles.forEach(jsFile => babelTask(jsFile, lint));
};

export { developmentTask };
