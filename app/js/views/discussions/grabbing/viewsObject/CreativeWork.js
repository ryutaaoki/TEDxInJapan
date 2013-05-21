define([
  'joshlib!utils/woodman',
  'joshlib!utils/dollar',
  'joshlib!vendor/underscore',
  'joshlib!vendor/backbone',

  'joshlib!ui/item',

  'text!templates/discussions/grabbing/viewsObject/CreativeWork.html'
], function(
  woodman,
  $,
  _,
  Backbone,

  Item,

  CreativeTemplate
) {
  var logger = woodman.getLogger('views.CreativeWorkView');
  var CreativeWorkView = Item.extend({

    initialize: function(options) {
      logger.info('initialize CreativeWorkView');
      options = options || {};

      options.template = CreativeTemplate;

      Item.prototype.initialize.call(this,options);
    }

  });

  return CreativeWorkView;
});
