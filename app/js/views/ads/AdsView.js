define([
  'joshlib!utils/woodman',
  'joshlib!utils/dollar',
  'joshlib!vendor/underscore',
  'joshlib!vendor/backbone',
  'joshlib!ui/item',

  'text!templates/ads/Ads.html'
], function(
  woodman,
  $,
  _,
  Backbone,
  Item,

  AdsTemplate
) {
  var logger = woodman.getLogger('views.AdsView');
  var AdsView = Item.extend({

    initialize: function(options) {
      logger.info('initialize AdsView');
      var options = options || {};

      options.template = AdsTemplate;

      Item.prototype.initialize.call(this,options);
    }
  });

  return AdsView;
});