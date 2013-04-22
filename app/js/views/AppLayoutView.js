/*global isMobile */

define([
  'joshlib!utils/woodman',
  'joshlib!utils/dollar',
  'joshlib!vendor/underscore',
  'joshlib!vendor/backbone',

  'joshlib!ui/layout',

  'views/BaseContentSubView',

  'views/DisplayerView',
  'views/TalksView',
  'views/TwitterPostsView',
  'views/AboutView'
], function(
  woodman,
  $,
  _,
  Backbone,

  Layout,

  BaseSubView,

  DisplayerView,
  TalksView,
  TwitterPostsView,
  AboutView
) {
  var logger = woodman.getLogger('views.AppLayoutView');
  var BaseLayout = Layout.extend(BaseSubView);
  return BaseLayout.extend({

    initialize: function(options) {
      logger.info('initialize AppLayoutView');
      this.views = [];
      options = options || {};

      /**
      * Create the children elements.
      * In this case, basically the whole interface.
      **/

      //----------
      /**
      *********************
      * Home page views *
      *********************
      */
      var displayerView = new DisplayerView({
        appController: options.appController
      });
      this.views.push(displayerView);

      var talksView = new TalksView({
        appController: options.appController
      });
      this.views.push(talksView);

      var twitterPostsView = new TwitterPostsView({
        appController: options.appController
      });
      this.views.push(twitterPostsView);

      console.info(this.views);

      //-----------------------------------

      /**
      *********************
      * Conferences views *
      *********************
      */

      // var eventsView = new ListEventsView({
      //   appController: options.appController
      // });
      // this.views.push(eventsView);

      //-----------------------------------

      /**
      *********************
      * Discussions views *
      *********************
      */

      //-----------------------------------

      /**
      *********************
      * About views *
      *********************
      */

      //-----------------------------------
      options.children = {
        displayer: displayerView,
        talks: talksView,
        twitterPosts: twitterPostsView
      };

      Layout.prototype.initialize.call(this, options);
      logger.info('End initialize AppLayoutView');
    },

    enhance: function() {
      Layout.prototype.enhance.call(this);
    }

  });

  return BaseLayout;
});
