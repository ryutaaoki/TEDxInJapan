define([
  'joshlib!utils/woodman',
  'joshlib!utils/dollar',
  'joshlib!vendor/underscore',
  'joshlib!vendor/backbone',

  'joshlib!ui/item',

  'text!templates/discussions/grabbing/viewsObject/WebPage.html'
], function(
  woodman,
  $,
  _,
  Backbone,

  Item,

  WebPageTemplate
) {
  var logger = woodman.getLogger('views.WebPageView');
  var WebPageView = Item.extend({

    initialize: function(options) {
      logger.info('initialize WebPageView');
      options = options || {};

      options.template = WebPageTemplate;

      Item.prototype.initialize.call(this,options);
    }

  });

  return WebPageView;
});
