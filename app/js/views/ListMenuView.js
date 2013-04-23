define([
  'joshlib!utils/woodman',
  'joshlib!utils/dollar',
  'joshlib!vendor/underscore',
  'joshlib!vendor/backbone',

  'joshlib!ui/list',
  'joshlib!ui/item',

  'text!templates/ListMenu.html'
], function(
  woodman,
  $,
  _,
  Backbone,

  List,
  Item,

  MenuTemplate
) {
  var logger = woodman.getLogger('views.ListMenuView');
  var MenuView = List.extend({

    initialize: function(options) {
      logger.info('initialize ListMenu');
      var options = options || {};
      options.template = MenuTemplate;

      List.prototype.initialize.call(this,options);
    },
  });

  return MenuView;
});