define([
  'joshlib!utils/woodman',
  'joshlib!utils/dollar',
  'joshlib!vendor/underscore',
  'joshlib!vendor/backbone',

  // 'joshlib!ui/list',
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
      'click #tedx-map'  : 'tedxMap',
      'click #tedx-radio': 'tedxRadio'
    },

    initialize: function(options) {
      logger.info('initialize MenuDisplayView');
      var options = options || {};

      options.template = MenuDisplayTemplate;

      Item.prototype.initialize.call(this,options);
    },

    tedxLive: function () {
      logger.info('Gotcha ! TEDx Live !');
      // this.$el.find($('img')).first().show();
    },

    tedxMap: function () {
      logger.info('Display Google Maps API with TEDx in the country !');
      // this.$el.find($('img')).first().hide();


      // var gmap = new GMap();
      // console.log(gmap);
      /* render the map GoogleMaps API v3 */

    },

    tedxRadio: function () {
      logger.info('Edit view Radio to listen TEDx live radio !');
      // this.$el.find($('img')).first().show();
    }
  });

  return MenuDisplayView;
});