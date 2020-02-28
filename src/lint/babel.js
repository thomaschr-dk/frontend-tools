import { CLIEngine } from 'eslint';
import path from 'path';

const babelLint = (code, file) => {
  const cli = new CLIEngine();
  const report = cli.executeOnText(code, path.basename(file));
  const formatter = cli.getFormatter();
  report.results[0].filePath = file;
  const results = formatter(report.results);

  return results ?? false;
};

export { babelLint };
