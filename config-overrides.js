const { override, addWebpackAlias, } = require('customize-cra');
const path = require('path');

module.exports = override(
  addWebpackAlias({
    '@fontsource': path.resolve(__dirname, 'node_modules/@fontsource'),
    '~': path.resolve(__dirname, 'src'),
  })
);
