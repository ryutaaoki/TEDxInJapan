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

    initialize: function(options) {
      logger.info('initialize MenuDisplayView');
      var options = options || {};

      options.template = MenuDisplayTemplate;

      Item.prototype.initialize.call(this,options);
    },
  });

  return MenuDisplayView;
});