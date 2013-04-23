define([
  'joshlib!utils/woodman',
  'joshlib!utils/dollar',
  'joshlib!vendor/underscore',
  'joshlib!vendor/backbone',
  'joshlib!ui/layout',

  'views/DisplayerView',
  'views/TalksView',
  'views/TweetsView'

], function(
  woodman,
  $,
  _,
  Backbone,
  Layout,

  DisplayerView,
  TalksView,
  TweetsView
) {
  var logger = woodman.getLogger('views.HomePagePanel');
  var HomePagePanel = Layout.extend({

    initialize: function(options) {
      logger.info('initialize HomePagePanel');
      var options = options || {};

      this.displayer = new DisplayerView({
        appController: options.appController
      });

      this.talks = new TalksView({
        appController: options.appController
      });

      this.tweets = new TweetsView({
        appController: options.appController
      });

      options.children = {
        displayer: this.displayer,
        talks: this.talks,
        tweets: this.tweets
      };

      Layout.prototype.initialize.call(this,options);
    },
  });

  return HomePagePanel;
});