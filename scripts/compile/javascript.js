const logger = require('../utilities/logger');
const glob = require('glob');
const webpack = require('webpack');

module.exports = {
  renderAll(graphic) {
    const paths = glob.sync(`src/javascript/*.js`);
    const manifest = new Array();

    paths.forEach(path => {
      this.render(path, graphic);
      manifest.push(path.replace(`src/javascript/`, ''));
    });

    return manifest;
  },

  render(path) {
    logger.log('js', 'compiling ' + path);
    let done = false;

    const compiler = webpack({
      mode: 'development',
      entry: __dirname.replace('scripts/compile', '') + path,
      output: {
        path: __dirname.replace('scripts/compile', '') + '.build/',
        filename: path.replace(`src/javascript/`, '')
      },
      module: {
        rules: [
          {
            test: /\.handlebars$/,
            loader: 'handlebars-loader'
          }
        ]
      }
    });

    compiler.run((err, stats) => {
      if (stats.compilation.errors && stats.compilation.errors.length) {
        console.log(stats.compilation.errors);
      }
      done = true;
    });

    require('deasync').loopWhile(function(){return !done;});

    logger.log('js', 'finished ' + path);
  }
}