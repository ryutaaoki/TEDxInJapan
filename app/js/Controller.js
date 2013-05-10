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
      this.getPlaylistYoutube();
      this.getFeedGrabbing();

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

        //We show the child panel "homepage"
        self.layout.getChild('panel').showChild('homepage');

        // declare variables
        var panelDisplay = self.layout.getChild('panel').getChild('homepage').getChild('displayer').getChild('panelDisplay');

        panelDisplay.getChild('maps').createGoogleMaps();
        self.layout.getChild('menuList').$el.find('nav .active').removeClass('active');
      });

      this.router.on('route:maps', function() {

        self.layout.getChild('panel').showChild('homepage');

        var displayer = self.layout.getChild('panel').getChild('homepage').getChild('displayer');
        displayer.getChild('menuDisplay').$el.find('#tedx-map').addClass('active');

        displayer.getChild('panelDisplay').showChild('maps');
        displayer.getChild('panelDisplay').getChild('maps').createGoogleMaps();
        displayer.getChild('menuDisplay').$el.find('#tedx-now').removeClass('active');
      });

      this.router.on('route:live', function() {

        self.layout.getChild('panel').showChild('homepage');

        var displayer = self.layout.getChild('panel').getChild('homepage').getChild('displayer');
        displayer.getChild('menuDisplay').$el.find('#tedx-now').addClass('active');

        displayer.getChild('panelDisplay').showChild('live');
        displayer.getChild('menuDisplay').$el.find('#tedx-map').removeClass('active');
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
      this.data.pastevents   = new Backbone.Collection();
      this.data.postevents   = new Backbone.Collection();
      this.data.blacklist    = new Backbone.Collection();
      this.data.liveevent    = new Backbone.Collection();
      this.data.youtube      = new Backbone.Collection();
      this.data.aboutContent = new Backbone.Collection();
      this.data.rssyoutube   = new Backbone.Collection();
    },

    getPastEvents: function(currentDate) {

      var self = this;

      var datasource = Joshfire.factory.getDataSource('tedxevents');
      datasource.find({

      }, function (err, data) {
        _.each(data.entries, function (entry) {
          if(new Date(self.convertDate(entry.startDate)) < new Date(self.convertDate(currentDate)))
            self.data.pastevents.add(entry);
        });
        self.data.pastevents.trigger('loaded', self.data.pastevents);
      });
    },

    getPostEvents: function(currentDate) {

      var self = this;

      var datasource = Joshfire.factory.getDataSource('tedxevents');
      datasource.find({

      }, function (err, data) {
        var count = 0;
        _.each(data.entries, function (entry) {
          if(new Date(self.convertDate(entry.startDate)) > new Date(self.convertDate(currentDate)) && count < 3){
            self.data.postevents.add(entry);
            count++;
          }
        });
        self.data.postevents.trigger('loaded', self.data.postevents);
      });
    },

    convertDate: function(date) {
      var newDate = date.split('/');
      newDate = newDate[1] + '/' + newDate[0] + '/' + newDate[2];

      return newDate;
    },

    getCurrentDate: function() {
      var today = new Date();

      var year = today.getFullYear();
      var month = today.getMonth() + 1;
      var day = today.getDate();

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
    },

    getPlaylistYoutube: function () {
      var self = this;

      var datasource = Joshfire.factory.getDataSource('youtube');
      datasource.find({
        limit: 9
      }, function (err, data) {
        _.each(data.entries, function (entry) {
          self.data.youtube.add(entry);
        });
        self.data.youtube.trigger('loaded', self.data.youtube);
      });
    },

    getFeedGrabbing: function () {
      var self = this;

      var datasource = Joshfire.factory.getDataSource('rssyoutube');
      datasource.find({}, function (error, data) {
        _.each(data.entries, function (entry) {
          self.data.rssyoutube.add(entry);
        });
        self.data.rssyoutube.trigger('loaded', self.data.youtube);
      });

    }

  });

  return Controller;
});
