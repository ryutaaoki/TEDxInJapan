define([
  'joshlib!utils/woodman',
  'joshlib!utils/dollar',
  'joshlib!vendor/underscore',
  'joshlib!vendor/backbone',

  'joshlib!ui/item',

  'text!templates/Menu.html'
], function(
  woodman,
  $,
  _,
  Backbone,

  Item,

  MenuTemplate
) {
  var logger = woodman.getLogger('views.MenuView');
  var MenuView = Item.extend({

    initialize: function(options) {
      logger.info('initialize Menu');
      var options = options || {};
      options.template = MenuTemplate;

      Item.prototype.initialize.call(this,options);
    },
  });

  return MenuView;
});