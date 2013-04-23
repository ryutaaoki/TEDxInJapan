define([
  'joshlib!utils/woodman',
  'joshlib!utils/dollar',
  'joshlib!vendor/underscore',
  'joshlib!vendor/backbone',

  'joshlib!ui/item',

  'text!templates/RadioLive.html'
], function(
  woodman,
  $,
  _,
  Backbone,

  Item,

  RadioTemplate
) {
  var logger = woodman.getLogger('views.RadioLiveView');
  var RadioLiveView = Item.extend({

    initialize: function(options) {
      logger.info('initialize RadioLiveView');
      var options = options || {};

      options.template = RadioTemplate;

      Item.prototype.initialize.call(this,options);
    },
  });

  return RadioLiveView;
});