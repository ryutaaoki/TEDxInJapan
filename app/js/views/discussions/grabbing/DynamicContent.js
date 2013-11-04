define([
  'joshlib!utils/woodman',
  'joshlib!utils/dollar',
  'joshlib!vendor/underscore',
  'joshlib!vendor/backbone',

  'joshlib!ui/dynamiccontainer'
], function(
  woodman,
  $,
  _,
  Backbone,

  DynamicContainer
) {
  var logger = woodman.getLogger('views.DynamicContentView');
  var DynamicContentView = DynamicContainer.extend({

    initialize: function(options) {
      logger.info('initialize DynamicContentView');
      options = options || {};
      DynamicContainer.prototype.initialize.call(this,options);
    }
  });

  return DynamicContentView;
});