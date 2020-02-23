import sass from 'node-sass';
import fs from 'fs';
import path from 'path';
import chalk from 'chalk';

const sassTask = input => {
  const inputFile = fs.realpathSync(input);
  if (inputFile.match('(\\w+?)*\\/(?!_)(\\w+?)\\.scss$')) {
    const output = inputFile.replace('.scss', '.css');
    let sassOptions = {
      file: inputFile,
      outFile: output
    };
    switch (process.env.NODE_ENV) {
      case 'development':
        sassOptions = {
          ...sassOptions,
          sourceMap: true,
          sourceMapEmbed: true
        };
        break;
      case 'production':
        sassOptions = {
          ...sassOptions,
          outputStyle: 'compressed'
        };
        break;
      default:
    }
    sass.render(sassOptions, (sassError, result) => {
      if (!sassError) {
        fs.writeFile(output, result.css, writeError => {
          if (!writeError) {
            console.log(
              chalk`{bold.red [SASS]} {green CSS written to file: ${path.basename(output)}}`
            );
          } else {
            console.log(writeError);
          }
        });
      } else {
        console.log(sassError);
      }
    });
  }
};

export default sassTask;
