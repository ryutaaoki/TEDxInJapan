define([
  'joshlib!utils/woodman',
  'joshlib!utils/dollar',
  'joshlib!vendor/underscore',
  'joshlib!vendor/backbone',

  'joshlib!ui/item',

  'text!templates/homepage/displayer/MenuDisplay.html'
], function(
  woodman,
  $,
  _,
  Backbone,

  Item,

  MenuDisplayTemplate
) {
  var logger = woodman.getLogger('views.MenuDisplayView');
  var MenuDisplayView = Item.extend({

    events: {
      'click #tedx-now'  : 'tedxLive',
      'click #tedx-map'  : 'tedxMap'
    },

    initialize: function(options) {
      logger.info('initialize MenuDisplayView');
      var options = options || {};

      options.template = MenuDisplayTemplate;

      Item.prototype.initialize.call(this,options);
    },

    tedxLive: function () {
      logger.info('Gotcha ! TEDx Live !');
    },

    tedxMap: function () {
      logger.info('Display Google Maps API with TEDx in the country !');
    }
  });

  return MenuDisplayView;
});