define([
  'joshlib!utils/woodman',
  'joshlib!utils/dollar',
  'joshlib!vendor/underscore',
  'joshlib!vendor/backbone',

  'joshlib!ui/cardpanel',

  'views/LiveView'
], function(
  woodman,
  $,
  _,
  Backbone,

  CardPanel,

  LiveView
) {
  var logger = woodman.getLogger('views.AppPanelView');
  var DisplayPanel = CardPanel.extend({

    initialize: function(options) {
      logger.info('initialize AppPanelView');
      var options = options || {};

      //--------- Different Panel Creation
      this.live = new LiveView({
        appController: options.appController,
        model: new Backbone.Model()
      });
      //--------- END Different Panel Creation

      options.children = {
        live: this.live
      }
      CardPanel.prototype.initialize.call(this,options);
    }

  });

  return DisplayPanel;
});