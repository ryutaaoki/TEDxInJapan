define([
  'joshlib!utils/woodman',
  'joshlib!utils/dollar',
  'joshlib!vendor/underscore',
  'joshlib!vendor/backbone',

  'joshlib!ui/cardpanel',

  'views/HomePagePanel'
], function(
  woodman,
  $,
  _,
  Backbone,

  CardPanel,

  HomePagePanel
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
      //--------- END Different Panel Creation

      options.children = {
        homepage: this.homepage
        // + conferences
        // + discussions
        // + aboutTEDxenFrance
      }
      CardPanel.prototype.initialize.call(this,options);
    }

  });

  return AppPanel;
});