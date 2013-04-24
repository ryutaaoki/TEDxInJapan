define([
  'joshlib!utils/woodman',
  'joshlib!utils/dollar',
  'joshlib!vendor/underscore',
  'joshlib!vendor/backbone',

  'joshlib!ui/item',

  'text!templates/homepage/displayer/Maps.html'
], function(
  woodman,
  $,
  _,
  Backbone,

  Item,

  MapsTemplate
) {
  var logger = woodman.getLogger('views.MapsView');
  var MapsView = Item.extend({

    initialize: function(options) {
      logger.info('initialize MapsView');
      var options = options || {};

      options.template = MapsTemplate;

      Item.prototype.initialize.call(this,options);
    },
  });

  return MapsView;
});