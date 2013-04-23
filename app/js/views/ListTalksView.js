define([
  'joshlib!utils/woodman',
  'joshlib!utils/dollar',
  'joshlib!vendor/underscore',
  'joshlib!vendor/backbone',

  'joshlib!ui/list',
  'joshlib!ui/item',

  'text!templates/ItemTalks.html'
], function(
  woodman,
  $,
  _,
  Backbone,

  List,
  Item,

  TalksLayout
) {
  var logger = woodman.getLogger('views.ListTalksView');
  var ListTalksView = List.extend({

    initialize: function(options) {
      logger.info('initialize ListTalks');
      var options = options || {};
      options.template = TalksLayout;

      List.prototype.initialize.call(this,options);
    },
  });

  return ListTalksView;
});