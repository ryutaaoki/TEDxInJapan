define([
  'joshlib!utils/woodman',
  'joshlib!utils/dollar',
  'joshlib!vendor/underscore',
  'joshlib!vendor/backbone',

  'joshlib!ui/item',

  'text!templates/discussions/grabbing/ItemStatus.html'

], function(
  woodman,
  $,
  _,
  Backbone,

  Item,

  ItemStatusTemplate
) {
  var logger = woodman.getLogger('views.ItemStatusView');
  var ItemStatusView = Item.extend({

    initialize: function(options) {
      logger.info('initialize ItemStatusView');
      options = options || {};
      options.template = ItemStatusTemplate;
      Item.prototype.initialize.call(this,options);
    }

  });

  return ItemStatusView;
});