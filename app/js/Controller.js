define([
  'joshlib!utils/woodman',
  'joshlib!utils/i18n',
  'joshlib!vendor/underscore',
  'joshlib!vendor/backbone',
  'joshlib!collection',

  'views/AppLayoutView',

  'Router',

  '../lang/config'
], function (
  woodman,
  i18n,
  _,
  Backbone,
  Collection,

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

        // Remove the active class of the active menu
        self.layout.getChild('menuList').$el.find('nav .active').removeClass('active');

        // declare variables
        var panelDisplay = self.layout.getChild('panel').getChild('homepage').getChild('displayer').getChild('panelDisplay');

        if(!panelDisplay.getChild('live').collection.length)
          panelDisplay.showChild('maps');

        panelDisplay.getChild('maps').createGoogleMaps();
        self.layout.getChild('menuList').$el.find('nav #home-page').addClass('active');
      });

      /* Homepage Maps */
      this.router.on('route:maps', function() {

        self.layout.getChild('panel').showChild('homepage');

        var displayer = self.layout.getChild('panel').getChild('homepage').getChild('displayer');
        displayer.getChild('menuDisplay').$el.find('#tedx-map').addClass('active');

        displayer.getChild('panelDisplay').showChild('maps');
        displayer.getChild('panelDisplay').getChild('maps').createGoogleMaps();
        displayer.getChild('menuDisplay').$el.find('#tedx-now').removeClass('active');
      });

      /* Homepage Live */
      this.router.on('route:live', function() {

        self.layout.getChild('panel').showChild('homepage');

        var displayer = self.layout.getChild('panel').getChild('homepage').getChild('displayer');
        displayer.getChild('menuDisplay').$el.find('#tedx-now').addClass('active');

        displayer.getChild('panelDisplay').showChild('live');
        displayer.getChild('menuDisplay').$el.find('#tedx-map').removeClass('active');
      });




      /* Homepage talks */
      this.router.on('route:talks', function (id) {

        self.layout.getChild('panel').showChild('homepage');
        var panelDisplay = self.layout.getChild('panel').getChild('homepage').getChild('displayer').getChild('panelDisplay');

        var result = self.data.youtube.where({ url: "http://www.youtube.com/watch?v=" + id});
        _.map( result, function( model ){
          var modal = self.layout.getChild('panel').getChild('homepage').getChild('talks').getChild('modalTalk');
          modal.setModel(model);
          modal.render();
          modal.showModal();
        });

        if(!panelDisplay.getChild('live').collection.length)
          panelDisplay.showChild('maps');

        self.layout.getChild('menuList').$el.find('nav .active').removeClass('active');
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

        var container = document.querySelector('#container');
        var pckry;
        // initialize Packery after all images have loaded
        imagesLoaded( container, function() {
          pckry = new Packery( container, {
            // options
            itemSelector: '.item',
            gutter: ".gutter-sizer",
            rowHeight: 0
          });
        });
      });




      /* About TEDx */
      this.router.on('route:about', function (){

        self.layout.getChild('panel').showChild('about');
        self.layout.getChild('menuList').$el.find('nav .active').removeClass('active');
        self.layout.getChild('menuList').$el.find('nav #about-page').addClass('active');
      });


      /* Contact */
      this.router.on('route:contact', function (){

        //We show the child panel "homepage"
        self.layout.getChild('panel').showChild('contact');

        // Remove the active class of the active menu
        self.layout.getChild('menuList').$el.find('nav .active').removeClass('active');

        self.layout.getChild('menuList').$el.find('nav #contact-page').addClass('active');
      });

      //----- End Listen change routes
      this.start();
    },

    createCollections: function() {
      this.data.pastevents   = new Collection();
      this.data.postevents   = new Collection();
      this.data.blacklist    = new Collection();
      this.data.liveevent    = new Collection();
      this.data.youtube      = new Collection();
      this.data.aboutContent = new Collection();
      this.data.grabbing     = new Collection();
    },

    getPastEvents: function(currentDate) {

      var self = this;

      var datasource = Joshfire.factory.getDataSource('tedxevents');
      datasource.find({}, function (error, data) {
        if(error) {
          logger.error(error);
          return;
        } else {
          _.each(data.entries, function (entry) {
            if(new Date(self.convertDate(entry.startDate)) < new Date(self.convertDate(currentDate))){
              entry.startDate = self.getDateName(entry.startDate);
              self.data.pastevents.add(entry);
            }
          });
          self.data.pastevents.trigger('loaded', self.data.pastevents);
        }
      });
    },

    getPostEvents: function(currentDate) {

      var self = this;

      var datasource = Joshfire.factory.getDataSource('tedxevents');
      datasource.find({

      }, function (error, data) {
        if(error) {
          logger.error(error);
          return;
        } else {
          var count = 0;
          _.each(data.entries, function (entry) {
            if(new Date(self.convertDate(entry.startDate)) > new Date(self.convertDate(currentDate)) && count < 3){
              entry.startDate = self.getDateName(entry.startDate);
              self.data.postevents.add(entry);
              count++;
            }
          });
          self.data.postevents.trigger('loaded', self.data.postevents);
        }
      });
    },

    getLiveTEDx: function() {
      var self = this;

      var datasource = Joshfire.factory.getDataSource('tedxevents');
      datasource.find({}, function (error, data) {
        if(error) {
          logger.error(error);
          return;
        } else {
          _.each(data.entries, function (entry) {
            if(entry.availability == "TRUE")
              self.data.liveevent.reset(entry);
          });
          self.data.liveevent.trigger('loaded', self.data.liveevent);
        }
      });
    },

    getAboutPageContent: function() {
      var self = this;

      var datasource = Joshfire.factory.getDataSource('about');
      self.data.aboutContent.setDataSource(datasource);
      self.data.aboutContent.fetch();
    },

    getPlaylistYoutube: function () {
      var self = this;

      var datasource = Joshfire.factory.getDataSource('youtube');
      self.data.youtube.setDataSourceQuery({limit:9});
      self.data.youtube.setDataSource(datasource);
      self.data.youtube.fetch();
    },

    getFeedGrabbing: function () {
      var self = this;

      var datasource = Joshfire.factory.getDataSource('grabbing');
      self.data.grabbing.setDataSource(datasource);
      self.data.grabbing.setDataSourceQuery({limit:40});
      self.data.grabbing.fetch();
    },

    getDateName: function(entryDate){
      Date.prototype.getMonthName = function(lang) {
        switch(lang){
          case 'fr':
            var m = ['Janvier','Fevrier','Mars','Avril','Mai','Juin','Juillet','Aout','Septembre','Octobre','Novembre','Décembre'];
            break;
          default:
          case 'en':
            var m = ['January','February','March','April','May','June','July','August','September','October','November','December'];
            break;
        }
        return m[this.getMonth()];
      }

      Date.prototype.getDayName = function() {
        switch(lang){
          case 'fr':
            var d = ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'];
            break;
          default:
          case 'en':
            var d = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
            break;
        }
        return d[this.getDay()];
      }

      var date = new Date(this.convertDate(entryDate));
      var lang = Joshfire.factory.config.template.options.language;
      switch(lang){
        default:
        case 'en':
          date = date.getDayName(lang) + ' ' + date.getMonthName(lang) + ' ' + date.getDate() + ',' + date.getFullYear();
          return date;
        case 'fr':
          date = date.getDayName(lang) + ' ' + date.getDate() + ' ' + date.getMonthName(lang) + ' ' + date.getFullYear();
          return date;
      }
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
    }

  });

  return Controller;
});
