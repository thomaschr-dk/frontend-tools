import { transform } from '@babel/core';
import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import babelPresets from '../../config/babel.presets.json';

const babelTask = file => {
  const inputFile = fs.realpathSync(file);
  const output = inputFile.replace('.babel', '');
  const fileContent = fs.readFileSync(inputFile, 'utf-8');
  const packagePath = path.dirname(path.dirname(__dirname));
  const dir = process.cwd();
  let babelOptions = {
    presets: babelPresets
  };

  switch (process.env.NODE_ENV) {
    case 'development':
      babelOptions = {
        ...babelOptions,
        sourceMaps: 'inline',
        sourceFileName: path.basename(inputFile)
      };
      break;
    case 'production':
      babelOptions.presets.push('minify');
      break;
    default:
  }

  // Change to directory where babel is configured and installed before transforming code
  process.chdir(packagePath);
  transform(fileContent, babelOptions, (babelError, result) => {
    // Change back to directory where script was called
    process.chdir(dir);
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
