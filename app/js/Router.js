/*global define, ga*/
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
      this.route('ads', 'ads', this.adsRoute);
    },

    defaultRoute: function() {
      logger.info('run default route');
      this.navigate('home', { trigger: true });
      ga('send', 'pageview', '#home');
    },

    homeRoute: function () {
      logger.info('run home route');
      this.navigate('home', { trigger: true });
      ga('send', 'pageview', '#home');
    },

    mapsRoute: function () {
      logger.info('run maps route');
      this.navigate('#home/maps', { trigger: true });
      ga('send', 'pageview', '#home/maps');
    },

    liveRoute: function () {
      logger.info('run live route');
      this.navigate('#home/live', { trigger: true });
      ga('send', 'pageview', '#home/live');
    },

    talksModalRoute: function (id) {
      logger.info('run talks route of id ' + id);
      this.navigate('#home/talks/' + id, { trigger: true });
    },

    conferencesRoute: function () {
      logger.info('run conferences route');
      this.navigate('conferences', { trigger: true });
      ga('send', 'pageview', '#conferences');
    },

    discussionsRoute: function () {
      logger.info('run discussions route');
      this.navigate('discussions', { trigger: true });
      ga('send', 'pageview', '#discussions');
    },

    aboutRoute: function () {
      logger.info('run about route');
      this.navigate('about', { trigger: true });
      ga('send', 'pageview', '#about');
    },

    contactRoute: function () {
      logger.info('run contact route');
      this.navigate('contact', { trigger: true });
      ga('send', 'pageview', '#contact');
    },

    adsRoute: function () {
      logger.info('run ads route');
      this.navigate('ads', { trigger: true });
      ga('send', 'pageview', '#ads');
    }
  });

  return Router;
});
