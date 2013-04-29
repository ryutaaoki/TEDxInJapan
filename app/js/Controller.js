define([
  'joshlib!utils/woodman',
  'joshlib!utils/i18n',
  'joshlib!vendor/underscore',
  'joshlib!vendor/backbone',

  'views/AppLayoutView',

  'Router',

  '../lang/config',
], function (
  woodman,
  i18n,
  _,
  Backbone,

  AppLayoutView,

  Router,

  LocaleConfig
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

      this.i18n = i18n;
      this.i18n.setLocale({
        locale: Joshfire.factory.config.template.options.language || 'auto',
        availableLocales: LocaleConfig.AVAILABLE,
        defaultLocale: LocaleConfig.DEFAULT
      }, function() {
        self.layout.render();
      });

      this.router.setRoutes();
      self.layout = this.layout;

      //----- Listen change routes

      /* HomePage */
      this.router.on('route:home', function (){
        self.layout.getChild('panel').showChild('homepage');
        self.layout.getChild('panel').getChild('homepage').getChild('displayer').getChild('panelDisplay').showChild('maps');
        self.layout.getChild('panel').getChild('homepage').getChild('displayer').getChild('menuDisplay').$el.find('#tedx-map').addClass('active');
        self.layout.getChild('menuList').$el.find('nav .active').removeClass('active');
      });

      this.router.on('route:maps', function() {
        self.layout.getChild('panel').showChild('homepage');
        self.layout.getChild('panel').getChild('homepage').getChild('displayer').getChild('panelDisplay').showChild('maps');
        self.layout.getChild('panel').getChild('homepage').getChild('displayer').getChild('menuDisplay').$el.find('#tedx-now').removeClass('active');
        self.layout.getChild('panel').getChild('homepage').getChild('displayer').getChild('menuDisplay').$el.find('#tedx-map').addClass('active');
      });

      this.router.on('route:live', function() {
        self.layout.getChild('panel').showChild('homepage');
        self.layout.getChild('panel').getChild('homepage').getChild('displayer').getChild('panelDisplay').showChild('live');
        self.layout.getChild('panel').getChild('homepage').getChild('displayer').getChild('menuDisplay').$el.find('#tedx-map').removeClass('active');
        self.layout.getChild('panel').getChild('homepage').getChild('displayer').getChild('menuDisplay').$el.find('#tedx-now').addClass('active');
      });

      /* Conferences */
      this.router.on('route:conferences', function (){
        self.layout.getChild('panel').showChild('conferences');
        self.layout.getChild('menuList').$el.find('nav .active').removeClass('active');
        self.layout.getChild('menuList').$el.find('nav #conferences-page').addClass('active');
      });

      /* Discussions */
      this.router.on('route:discussions', function (){
        self.layout.getChild('panel').showChild('discussions');
        self.layout.getChild('menuList').$el.find('nav .active').removeClass('active');
        self.layout.getChild('menuList').$el.find('nav #discussions-page').addClass('active');
      });

      /* About TEDx */
      this.router.on('route:about', function (){
        console.log('Render About TEDx page');
        self.layout.getChild('menuList').$el.find('nav .active').removeClass('active');
        self.layout.getChild('menuList').$el.find('nav #about-page').addClass('active');
      });

      //----- End Listen change routes
      this.start();
    }

  });

  return Controller;
});
