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
      el: '#content'
    });
    logger.info('AppLayoutView created');

    this.router.on('route:home', function(param) {
      logger.log('home');
    });

    this.router.on('route:about', function(param) {
      logger.log('about');
    });

    this.router.on('route:conferences', function(param) {
      logger.log('conferences');
    });

    this.router.on('route:discussions', function(param) {
      logger.log('discussions');
    });
  };

  _.extend(Controller.prototype, Backbone.Events, {
    /**
    * Safe main
    **/
    start: function() {
      logger.info('start application render');
      this.layout.render();
      console.log(this.layout.children);
      this.layout.children.displayer.render();
      this.layout.children.talks.render();
      this.layout.children.twitterPosts.render();
      this.router.setRoutes();
      Backbone.history.start();
    }

  });

  return Controller;
});
