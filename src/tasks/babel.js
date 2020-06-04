import { transform } from '@babel/core';
import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import { babelLint } from '../lint/babel';
import babelPresets from '../config/babel.presets.json';

const babelTask = (file, lint = false) => {
  const output = file.replace('.babel', '');
  const fileContent = fs.readFileSync(file, 'utf-8');
  const babelOptions = {
    presets: babelPresets,
    cwd: __dirname
  };

  if (lint) {
    const lintErrors = babelLint(fileContent, file);
    if (lintErrors) {
      console.log(lintErrors);
      return;
    }
  }

  switch (process.env.NODE_ENV) {
    case 'development':
      babelOptions.sourceMaps = 'inline';
      babelOptions.sourceFileName = path.basename(file);
      break;
    case 'production':
      babelOptions.presets.push('minify');
      babelOptions.comments = false;
      break;
    default:
  }

  transform(fileContent, babelOptions, (babelError, result) => {
    if (!babelError) {
      fs.writeFile(output, result.code, fsError => {
        if (!fsError) {
          console.log(
            chalk`{bold.yellow [Babel]} {green Babel compiled to file: ${path.basename(output)}}`
          );
        } else {
          console.log(fsError);
        }
      });
    } else {
      console.log(babelError);
    }
  });
};

export { babelTask };
