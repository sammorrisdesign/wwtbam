const fs = require('fs-extra');
const logger = require('../utilities/logger');

module.exports = {
  init() {
    logger.log('assets', 'transferring');

    if (fs.existsSync(`src/assets`)) {
      fs.copySync(`src/assets`, `.build/assets`);
    }

    logger.log('assets', 'finished')
  }
}