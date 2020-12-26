const fs = require('fs-extra');
const html = require('./compile/html');
const css = require('./compile/css');
const javascript = require('./compile/javascript');
const assets = require('./compile/assets');

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
