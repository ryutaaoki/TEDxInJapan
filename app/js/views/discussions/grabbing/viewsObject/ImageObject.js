define([
  'joshlib!utils/woodman',
  'joshlib!utils/dollar',
  'joshlib!vendor/underscore',
  'joshlib!vendor/backbone',

  'joshlib!ui/item',

  'text!templates/discussions/grabbing/viewsObject/ImageObject.html'
], function(
  woodman,
  $,
  _,
  Backbone,

  Item,

  ImageTemplate
) {
  var logger = woodman.getLogger('views.ImageObjectView');
  var ImageObjectView = Item.extend({

    initialize: function(options) {
      logger.info('initialize ImageObjectView');
      var options = options || {};

      options.template = ImageTemplate;

      Item.prototype.initialize.call(this,options);
    },

  });

  return ImageObjectView;
});
