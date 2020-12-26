const handlebars = require('handlebars');
const fs = require('fs-extra');
const glob = require('glob');
const logger = require('../utilities/logger');

module.exports = {
  render() {
    logger.log('html', 'compiling...');

    let data;

    if (fs.existsSync('data.json')) {
      data = fs.readJSONSync('data.json');
    } else {
      console.log('no data found, please run npm run data');
    }

    this.registerHelpers();
    this.registerPartials();

    const html = fs.readFileSync('src/templates/index.html', 'utf8');
    const template = handlebars.compile(html);
    fs.writeFileSync('.build/index.html', template({ path: 'http://localhost:5000/', data: data }));

    logger.log('html', 'finished');

    return 'index.html';
  },

  registerHelpers() {
    handlebars.registerHelper('handlise', string => {
      return string.toLowerCase().replace(/ /g, '-');
    })
  },

  registerPartials(graphicName) {
    let partials = glob.sync('src/templates/**/*.*');
    partials = partials.concat(glob.sync('.exports/*.*'));

    partials.forEach(partial => {
      const name = partial.replace('src/templates/', '').replace('.exports', 'exports').split('.')[0];
      const template = fs.readFileSync(partial, 'utf8');

      handlebars.registerPartial(name, template);
    });
  }
}