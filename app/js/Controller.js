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
      el: '#layout-content'
    });
    logger.info('AppLayoutView created');
  };

  _.extend(Controller.prototype, Backbone.Events, {
    /**
    * Safe main
    **/
    start: function() {
      logger.info('start application render');
      Backbone.history.start();
      this.layout.trigger('load');
    },

    init: function() {
      var self = this;
      logger.info('init');
      this.layout.render();
      this.router.setRoutes();
      self.layout = this.layout;

      //----- Listen change routes

      /* HomePage */
      this.router.on('route:home', function (){
        self.layout.getChild('panel').showChild('homepage');
      });

      /* Conferences */
      this.router.on('route:conferences', function (){
        self.layout.getChild('panel').showChild('conferences');
      });

      /* Discussions */
      this.router.on('route:discussions', function (){
        console.log('Render Discussions Page');
      });

      /* About TEDx */
      this.router.on('route:about', function (){
        console.log('Render About TEDx page');
      });

      //----- End Listen change routes
      this.start();
    }

  });

  return Controller;
});
