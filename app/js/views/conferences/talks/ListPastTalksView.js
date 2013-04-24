define([
  'joshlib!utils/woodman',
  'joshlib!utils/dollar',
  'joshlib!vendor/underscore',
  'joshlib!vendor/backbone',

  'joshlib!ui/list',
  'joshlib!ui/item',

  'text!templates/conferences/talks/ItemTalks.html'
], function(
  woodman,
  $,
  _,
  Backbone,

  List,
  Item,

  ItemTalksTemplate
) {
  var logger = woodman.getLogger('views.ListPastTalksView');
  var ListPastTalksView = List.extend({

    initialize: function(options) {
      logger.info('initialize ListPastTalks');
      var options = options || {};
      options.template = ItemTalksTemplate; // TODO: Change to render every past talks

      List.prototype.initialize.call(this,options);
    },
  });

  return ListPastTalksView;
});