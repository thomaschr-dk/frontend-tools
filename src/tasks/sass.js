import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import postcss from 'postcss';
import easyImport from 'postcss-easy-import';
import precss from 'precss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import stylelint from 'stylelint';
import scss from 'postcss-scss';
import postcssReporter from 'postcss-reporter';

const sassTask = (input, lint = false) => {
  if (input.match('(\\w+?)*\\/(?!_)(\\w+?)\\.scss$')) {
    const output = input.replace('.scss', '.css');
    const postcssOptions = {
      from: input,
      to: output,
      syntax: scss
    };
    const easyImportOptions = {
      prefix: '_',
      extensions: ['.css', '.scss'],
      plugins: []
    };

    if (lint) {
      easyImportOptions.plugins.push(stylelint);
    }
    const postcssPlugins = [easyImport(easyImportOptions), postcssReporter, precss, autoprefixer];
    switch (process.env.NODE_ENV) {
      case 'development':
        postcssOptions.map = true;
        break;
      case 'production':
        postcssPlugins.push(cssnano);
        break;
      default:
    }

    const css = fs.readFileSync(input, 'utf-8');
    const processor = postcss(postcssPlugins);
    processor
      .process(css, postcssOptions)
      .then(result => {
        fs.writeFile(output, result.css, writeError => {
          if (!writeError) {
            console.log(
              chalk`{bold.red [SASS]} {green CSS written to file: ${path.basename(output)}}`
            );
          } else {
            console.log(writeError);
          }
        });
      })
      .catch(postcssError => {
        console.log(postcssError);
      });
  }
};

export default sassTask;
