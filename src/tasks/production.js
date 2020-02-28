import { getCssFiles, getJsFiles } from '../utils/file-getter';
import { sassTask } from './sass';
import { babelTask } from './babel';

const productionTask = (lint = false) => {
  process.env.NODE_ENV = 'production';
  getCssFiles.forEach(cssFile => sassTask(cssFile, lint));
  getJsFiles.forEach(jsFile => babelTask(jsFile, lint));
};

export { productionTask };
