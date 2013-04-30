define([
  'joshlib!utils/woodman',
  'joshlib!utils/dollar',
  'joshlib!vendor/underscore',
  'joshlib!vendor/backbone',

  'joshlib!ui/cardpanel',

  'views/homepage/HomePagePanel',
  'views/conferences/ConferencesPagePanel',
  'views/discussions/DiscussionsPagePanel'
], function(
  woodman,
  $,
  _,
  Backbone,

  CardPanel,

  HomePagePanel,
  ConferencesPagePanel,
  DiscussionsPagePanel
) {
  var logger = woodman.getLogger('views.AppPanelView');
  var AppPanel = CardPanel.extend({

    initialize: function(options) {
      logger.info('initialize AppPanelView');
      var options = options || {};

      //--------- Different Panel Creation

      this.homepage = new HomePagePanel({
        appController: options.appController
      });

      this.conferences = new ConferencesPagePanel({
        appController: options.appController
      });

      this.discussions = new DiscussionsPagePanel({
        appController: options.appController
      });

      //--------- END Different Panel Creation

      options.children = {
        homepage: this.homepage,
        conferences: this.conferences,
        discussions: this.discussions
        // + aboutTEDxenFrance
      }
      CardPanel.prototype.initialize.call(this,options);
    }

  });

  return AppPanel;
});