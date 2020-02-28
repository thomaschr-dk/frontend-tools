import glob from 'glob';

const options = {
  ignore: ['requirejs-config.js', 'node_modules'],
  realpath: true
};

const getCssFiles = () => {
  return glob.sync('**/*.scss', options);
};

const getJsFiles = () => {
  return glob.sync('**/*.babel.js', options);
};

export { getCssFiles, getJsFiles };
