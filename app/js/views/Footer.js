define([
  'joshlib!utils/woodman',
  'joshlib!utils/dollar',
  'joshlib!vendor/underscore',
  'joshlib!vendor/backbone',

  'joshlib!ui/item',

  'text!templates/Footer.html'
], function(
  woodman,
  $,
  _,
  Backbone,

  Item,

  FooterTemplate
) {
  var logger = woodman.getLogger('views.FooterView');
  var FooterView = Item.extend({

    initialize: function(options) {
      logger.info('initialize Footer');
      var options = options || {};
      options.template = FooterTemplate;

      Item.prototype.initialize.call(this,options);
    },
  });

  return FooterView;
});