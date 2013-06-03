define([
  'joshlib!utils/woodman',
  'joshlib!vendor/backbone'
], function (woodman, Backbone) {
  var logger = woodman.getLogger('Router');

  var Router = Backbone.Router.extend({
    initialize: function(opt) {
      logger.info('initialize');
      this.appController = opt.appController;
      Backbone.Router.prototype.initialize.call(this);
    },

    setRoutes: function() {
      /**
      * WARNING : This configuration may become unstable.
      * Backbone.Router seems to rely on the order in
      * which the routes are defined to define their priority.
      * But, the routes are stored in an Object using keys —
      * meaning there is no actual order inside the object.
      * This mechanism actually relies on the JS engine
      * executing backbone, which although at the time
      * poses no problems could eventually become one.
      **/
      this.route('*path', 'default', this.defaultRoute);
      this.route('home', 'home', this.homeRoute);
      this.route('home/maps', 'maps', this.mapsRoute);
      this.route('home/live', 'live', this.liveRoute);
      this.route('home/talks/:id', 'talks', this.talksModalRoute);
      this.route('conferences', 'conferences', this.conferencesRoute);
      this.route('discussions', 'discussions', this.discussionsRoute);
      this.route('about', 'about', this.aboutRoute);
      this.route('contact', 'contact', this.contactRoute);
    },

    defaultRoute: function() {
      logger.info('run default route');
      ga('send','pageview','#home');
      this.navigate('home', {
        trigger: true
      });
    },

    homeRoute: function () {
      logger.info('run home route');
      ga('send','pageview','#home');
      this.navigate('home', {
        trigger: true
      });
    },

    mapsRoute: function () {
      logger.info('run maps route');
      ga('send','pageview','#home/maps');
      this.navigate('#home/maps', {
        trigger: true
      });
    },

    liveRoute: function () {
      logger.info('run live route');
      ga('send','pageview','#home/live');
      this.navigate('#home/live', {
        trigger: true
      });
    },

    talksModalRoute: function (id) {
      var self = this;
      logger.info('run talks route of id ' + id);
      this.navigate('#home/talks/' + id, {
        trigger: true
      });
      this.appController.data.youtube.on('load', function() {
        var result = self.appController.data.youtube.where({ url: "http://www.youtube.com/watch?v=" + id});
        _.map( result, function( model ){
          self.appController.layout.panel.homepage.talks.modalTalk.setModel(model);
          self.appController.layout.panel.homepage.talks.modalTalk.render();
          self.appController.layout.panel.homepage.talks.modalTalk.showModal();
        });
      });
    },

    conferencesRoute: function () {
      logger.info('run conferences route');
      ga('send','pageview','#conferences');
      this.navigate('conferences', {
        trigger: true
      });
    },

    discussionsRoute: function () {
      logger.info('run discussions route');
      ga('send','pageview','#discussions');
      this.navigate('discussions', {
        trigger: true
      });
      this.appController.data.grabbing.on('load', function(){
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
    },

    aboutRoute: function () {
      logger.info('run about route');
      ga('send','pageview','#about');
      this.navigate('about', {
        trigger: true
      });
    },

    contactRoute: function () {
      logger.info('run contact route');
      ga('send','pageview','#contact');
      this.navigate('contact', {
        trigger: true
      });
    }
  });

  return Router;
});
