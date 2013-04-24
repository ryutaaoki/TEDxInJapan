define([
  'joshlib!utils/woodman',
  'joshlib!utils/dollar',
  'joshlib!vendor/underscore',
  'joshlib!vendor/backbone',

  'joshlib!ui/item',

  'text!templates/homepage/displayer/DisplayLive.html'
], function(
  woodman,
  $,
  _,
  Backbone,

  Item,

  LiveTemplate
) {
  var logger = woodman.getLogger('views.LiveView');
  var LiveView = Item.extend({

    initialize: function(options) {
      logger.info('initialize LiveView');
      var options = options || {};

      options.template = LiveTemplate;

      Item.prototype.initialize.call(this,options);
    },
  });

  return LiveView;
});