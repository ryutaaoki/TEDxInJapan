define([
  'joshlib!utils/woodman',
  'joshlib!utils/dollar',
  'joshlib!vendor/underscore',
  'joshlib!vendor/backbone',
  'joshlib!ui/layout',

  'views/ads/AdsView',

  'text!templates/ads/AdsLayout.html'
], function(
  woodman,
  $,
  _,
  Backbone,
  Layout,

  AdsView,

  AdsLayout
) {
  var logger = woodman.getLogger('views.AdsPagePanel');
  var AdsPagePanel = Layout.extend({

    initialize: function(options) {
      logger.info('initialize AdsPagePanel');
      options = options || {};
      options.template = AdsLayout;

      this.ads = new AdsView({
        appController: options.appController,
        model: new Backbone.Model()
      });

      options.children = {
        ads: this.ads
      };

      Layout.prototype.initialize.call(this,options);
    }
  });

  return AdsPagePanel;
});