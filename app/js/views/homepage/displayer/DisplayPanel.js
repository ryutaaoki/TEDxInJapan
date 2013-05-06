define([
  'joshlib!utils/woodman',
  'joshlib!utils/dollar',
  'joshlib!vendor/underscore',
  'joshlib!vendor/backbone',

  'joshlib!ui/cardpanel',

  'views/homepage/displayer/LiveView',
  'views/homepage/displayer/MapsView'
], function(
  woodman,
  $,
  _,
  Backbone,

  CardPanel,

  LiveView,
  MapsView
) {
  var logger = woodman.getLogger('views.AppPanelView');
  var DisplayPanel = CardPanel.extend({

    initialize: function(options) {
      logger.info('initialize AppPanelView');
      var options = options || {};

      //--------- Different Panel Creation
      this.live = new LiveView({
        appController: options.appController,
        collection: options.collection
      });

      this.maps = new MapsView({
        appController: options.appController,
        model: new Backbone.Model()
      });
      //--------- END Different Panel Creation

      options.children = {
        live: this.live,
        maps: this.maps
      };

      CardPanel.prototype.initialize.call(this,options);
    }

  });

  return DisplayPanel;
});