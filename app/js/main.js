/**
 * @fileOverview Main entry point for the application
 *
 * Note RequireJS must be available.
 */
/*global requirejs, woodmanConfig*/
requirejs.config({
  paths: {
    'text': 'lib/text'
  }
});

requirejs([
  'Controller',
  'joshlib!utils/woodman',
  'joshlib!utils/onready'
], function (Controller, woodman, onReady) {
  // If defined, Woodman's configuration is in a global "woodmanConfig" object.
  // Note the configuration is typically not defined in the production version
  // of the application.
  var config = {};
  if (typeof woodmanConfig !== 'undefined') {
    config = woodmanConfig;
  }

  // Initialize Woodman and start the application once done
  woodman.load(config, function () {
    var logger = woodman.getLogger('main');
    logger.log('woodman initialized');

    onReady(function () {
      logger.info('application started');
      window.app = new Controller();
      window.app.init();
    });
  });
});
