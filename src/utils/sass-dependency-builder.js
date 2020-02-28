import * as sassExtract from 'sass-extract';
import path from 'path';

const buildSassDependencies = files => {
  const sassDependencies = {};
  files.forEach(file => {
    if (path.extname(file) === '.scss') {
      const rendered = sassExtract.renderSync({ file });
      sassDependencies[file] = rendered.stats.includedFiles;
    }
  });

  return sassDependencies;
};

export { buildSassDependencies };
