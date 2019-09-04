const a = require('../lib');

(async () => {
  try {
    await a(__dirname)
  } catch (e) {
    console.error('user error handler', e);
  }
})()
