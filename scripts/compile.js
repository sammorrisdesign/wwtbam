const fs = require('fs-extra');
const html = require('./compile/html');
const css = require('./compile/css');
const javascript = require('./compile/javascript');
const assets = require('./compile/assets');
const preview = require('./preview/preview');

const dest = process.argv[2] === 'remote' ? 'remote' : 'local';

if (!fs.existsSync('.build')) {
  fs.mkdirSync('.build');
} else {
  fs.emptyDirSync('.build');
}

html.render();
css.renderAll();
javascript.renderAll();
assets.init();
// preview.init();
