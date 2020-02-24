import { transform } from '@babel/core';
import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import { CLIEngine } from 'eslint';
import babelPresets from '../../config/babel.presets.json';

const babelTask = (file, lint = false) => {
  const output = file.replace('.babel', '');
  const fileContent = fs.readFileSync(file, 'utf-8');
  let babelOptions = {
    presets: babelPresets
  };

  if (lint) {
    const cli = new CLIEngine();
    const report = cli.executeOnText(fileContent, path.basename(file));
    const formatter = cli.getFormatter();
    report.results[0].filePath = file;
    const results = formatter(report.results);
    if (results) {
      console.log(results);
    }
  }
  switch (process.env.NODE_ENV) {
    case 'development':
      babelOptions = {
        ...babelOptions,
        sourceMaps: 'inline',
        sourceFileName: path.basename(file)
      };
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

export default babelTask;
