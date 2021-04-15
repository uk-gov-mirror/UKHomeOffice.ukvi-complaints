'use strict';
const hof = require('hof');

const addDynamicSettings = (settings) => {
  settings.routes = settings.routes.map(route => require(route));
  settings.root = __dirname;
  settings.start = false;

  if (process.env.REDIS_URL) {
    settings.redis = process.env.REDIS_URL;
  }

  return settings;
};

/*
 During automation test setup, we ping the app with '?automation-test' query to check it is ready before running tests.
 Put a cookie on this request so it doesn't fail HOF-middleware cookie check.
*/
const addAutomationTestCookie = (req, res, next) => {
  if (req.query['automation-test'] !== undefined) {
    req.cookies.testCookie = 'test';
  }
  return next();
};

const app = hof(addDynamicSettings(require('./hof.settings')));
app.use('/start', (req, res, next) => addAutomationTestCookie(req, res, next));

module.exports = app;
