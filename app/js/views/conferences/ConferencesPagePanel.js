define([
  'joshlib!utils/woodman',
  'joshlib!utils/dollar',
  'joshlib!vendor/underscore',
  'joshlib!vendor/backbone',
  'joshlib!ui/layout',

  'views/conferences/NextEventsLayoutView',
  'views/conferences/PastTalksView',

  'models/talk'
], function(
  woodman,
  $,
  _,
  Backbone,
  Layout,

  NextEventsView,
  TalksView,

  Talk
) {
  var logger = woodman.getLogger('views.ConferencesPagePanel');
  var ConferencesPagePanel = Layout.extend({

    initialize: function(options) {
      logger.info('initialize ConferencesPagePanel');
      var options = options || {};

      this.displayer = new NextEventsView({
        appController: options.appController,
        collection: options.appController.data.postevents
      });

      this.talks = new TalksView({
        appController: options.appController,
        collection: options.appController.data.pastevents
      });

      options.children = {
        displayer: this.displayer,
        talks: this.talks
      };

      Layout.prototype.initialize.call(this,options);
    },
  });

  return ConferencesPagePanel;
});