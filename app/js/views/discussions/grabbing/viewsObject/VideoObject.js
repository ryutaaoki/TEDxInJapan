define([
  'joshlib!utils/woodman',
  'joshlib!utils/dollar',
  'joshlib!vendor/underscore',
  'joshlib!vendor/backbone',

  'joshlib!ui/item',

  'text!templates/discussions/grabbing/viewsObject/VideoObject.html'
], function(
  woodman,
  $,
  _,
  Backbone,

  Item,

  VideoTemplate
) {
  var logger = woodman.getLogger('views.VideoObjectView');
  var VideoObjectView = Item.extend({

    initialize: function(options) {
      logger.info('initialize VideoObjectView');
      var options = options || {};

      options.template = VideoTemplate;

      Item.prototype.initialize.call(this,options);
    },

  });

  return VideoObjectView;
});
