const a = require('../lib');
const path = require('path');

(async () => {
  try {
    await a(`${path.join(__dirname, 'test.js')}:8:1`)
  } catch (e) {
    console.error('user error handler', e);
  }
})()
