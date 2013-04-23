define([
  'joshlib!utils/woodman',
  'joshlib!utils/dollar',
  'joshlib!vendor/underscore',
  'joshlib!vendor/backbone',

  'joshlib!ui/list',
  'joshlib!ui/item',

  'text!templates/ListDisplay.html'
], function(
  woodman,
  $,
  _,
  Backbone,

  List,
  Item,

  ListDisplayTemplate
) {
  var logger = woodman.getLogger('views.ListDisplayView');
  var ListDisplayView = List.extend({

    initialize: function(options) {
      logger.info('initialize ListDisplayView');
      var options = options || {};

      options.template = ListDisplayTemplate;

      List.prototype.initialize.call(this,options);
    },
  });

  return ListDisplayView;
});