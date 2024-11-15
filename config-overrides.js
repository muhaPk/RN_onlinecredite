const { override, addBabelRc } = require('customize-cra');

module.exports = override(
    addBabelRc(),
);