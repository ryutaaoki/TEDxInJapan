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

    this.createCollections();

    this.layout = new AppLayoutView({
      appController: this,
      el: '#layout-content'
    });
    logger.info('AppLayoutView created');
  };

  _.extend(Controller.prototype, Backbone.Events, {
    data: {},
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

      var currentDate = this.getCurrentDate();

      this.getPastEvents(currentDate);
      this.getPostEvents(currentDate);
      this.getLiveTEDx();
      this.getAboutPageContent();

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

        var panelDisplay = self.layout.getChild('panel').getChild('homepage').getChild('displayer').getChild('panelDisplay');

        if(panelDisplay.getChild('live').collection.length) {
          panelDisplay.showChild('live');
        }
        else panelDisplay.showChild('maps');

        self.layout.getChild('menuList').$el.find('nav .active').removeClass('active');
      });

      this.router.on('route:maps', function() {
        self.layout.getChild('panel').showChild('homepage');
        self.layout.getChild('panel').getChild('homepage').getChild('displayer').getChild('panelDisplay').showChild('maps');
      });

      this.router.on('route:live', function() {
        self.layout.getChild('panel').showChild('homepage');
        self.layout.getChild('panel').getChild('homepage').getChild('displayer').getChild('panelDisplay').showChild('live');
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
        self.layout.getChild('panel').showChild('about');
        self.layout.getChild('menuList').$el.find('nav .active').removeClass('active');
        self.layout.getChild('menuList').$el.find('nav #about-page').addClass('active');
      });

      //----- End Listen change routes
      this.start();
    },

    createCollections: function() {
      this.data.pastevents = new Backbone.Collection();
      this.data.postevents = new Backbone.Collection();
      this.data.blacklist = new Backbone.Collection();
      this.data.liveevent = new Backbone.Collection();
      this.data.aboutContent = new Backbone.Collection();
    },

    getPastEvents: function(currentDate) {

      var self = this;

      var datasource = Joshfire.factory.getDataSource('tedxevents');
      datasource.find({

      }, function (err, data) {
        _.each(data.entries, function (entry) {
          if(new Date(entry.startDate) < new Date(currentDate))
            self.data.pastevents.add(entry);
        });
        self.data.pastevents.trigger('loaded', self.data.pastevents);
      });
    },

    getPostEvents: function(currentDate) {

      var self = this;

      var datasource = Joshfire.factory.getDataSource('tedxevents');
      datasource.find({
        limit: 3,
      }, function (err, data) {
        _.each(data.entries, function (entry) {
          if(entry.startDate > currentDate)
            self.data.postevents.add(entry);
        });
        self.data.postevents.trigger('loaded', self.data.postevents);
      });
    },

    getCurrentDate: function() {
      var today = new Date();

      var year = today.getFullYear();
      var month = today.getMonth();
      var day = today.getDay();

      if(month < 10)
        month = "0"+month;

      if(day < 10)
        day = "0"+day;

      var currentDate = day + "/" + month + "/" + year;

      return currentDate;
    },

    getLiveTEDx: function() {
      var self = this;

      var datasource = Joshfire.factory.getDataSource('tedxevents');
      datasource.find({}, function (err, data) {
        _.each(data.entries, function (entry) {
          if(entry.availability == "TRUE")
            self.data.liveevent.reset(entry);
        });
        self.data.liveevent.trigger('loaded', self.data.liveevent);
      });
    },

    getAboutPageContent: function() {
      var self = this;

      var datasource = Joshfire.factory.getDataSource('about');
      datasource.find({}, function (err, data) {
        _.each(data.entries, function (entry) {
          self.data.aboutContent.add(entry);
        });
        self.data.aboutContent.trigger('loaded', self.data.aboutContent);
      });
    }

  });

  return Controller;
});
