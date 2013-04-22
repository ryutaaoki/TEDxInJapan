/*global isMobile */

define([
  'joshlib!utils/woodman',
  'joshlib!utils/dollar',
  'joshlib!vendor/underscore',
  'joshlib!vendor/backbone',

  'joshlib!ui/layout',

  'views/DisplayerView',
  'views/TalksView',
  'views/TwitterPostsView'
], function(
  woodman,
  $,
  _,
  Backbone,

  Layout,

  DisplayerView,
  TalksView,
  TwitterPostsView
) {
  var logger = woodman.getLogger('views.AppLayoutView');
  var BaseLayout = Layout.extend({

    events: {
      "click #page-title": "ahah",
      "click #conferences-page" : "hello"
    },

    ahah: function () {
      alert("coucou");
    },

    hello: function () {
      console.log("HELLOOOOOOO GUYS !");
    },

    initialize: function(options) {
      logger.info('initialize AppLayoutView');
      options = options || {};

      /**
      * Create the children elements.
      * In this case, basically the whole interface.
      **/
      var displayerView = new DisplayerView({
        appController: options.appController
      });

      var talksView = new TalksView({
        appController: options.appController
      });

      var twitterPostsView = new TwitterPostsView({
        appController: options.appController
      });

      options.children = {
        displayer: displayerView,
        talks: talksView,
        twitterPosts: twitterPostsView
      };

      Layout.prototype.initialize.call(this, options);
    },

    enhance: function() {
      Layout.prototype.enhance.call(this);
    }
  });

  return BaseLayout;
});
