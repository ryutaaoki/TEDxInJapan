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

    events: {
      "click #adgdf": "trackGA"
    },

    initialize: function(options) {
      logger.info('initialize Menu');
      var options = options || {};
      options.template = MenuTemplate;

      Item.prototype.initialize.call(this,options);
    },

    trackGA: function() {
      ga('send', 'event', 'TEDxEnFrance - GDFSuez Ads', 'click', 'advertisement-button');
    }
  });

  return MenuView;
});