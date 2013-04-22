define([
  'joshlib!utils/woodman',
  'joshlib!vendor/underscore',
  'joshlib!vendor/backbone',

  'views/AppLayoutView',

  'Router'
], function (
  woodman,
  _,
  Backbone,

  AppLayoutView,

  Router
) {
  // Retrieve the module's logger
  var logger = woodman.getLogger('Controller');

  var Controller = function () {
    logger.info('create');

    /**
    * Router creation
    */
    this.router = new Router({
      appController: this
    });
    logger.info("router created");

    this.layout = new AppLayoutView({
      appController: this,
      el: '#body-content'
    });
    logger.info('AppLayoutView created');
  };

  _.extend(Controller.prototype, Backbone.Events, {
    /**
    * Safe main
    **/
    start: function() {
      logger.info('start application render');
      console.log(this.layout);
      this.layout.render();
      this.router.setRoutes();
      Backbone.history.start();
    }

  });

  return Controller;
});
