define([
  'joshlib!utils/woodman',
  'joshlib!utils/dollar',
  'joshlib!vendor/underscore',
  'joshlib!vendor/backbone',

  'joshlib!ui/list',
  'joshlib!ui/item',

  'text!templates/conferences/displayer/ItemEvent.html'
], function(
  woodman,
  $,
  _,
  Backbone,

  List,
  Item,

  ItemEventTemplate
) {
  var logger = woodman.getLogger('views.ListTalksDisplayerView');
  var ListEventView = List.extend({

    initialize: function(options) {
      logger.info('initialize ListTalksDisplayerView');
      var options = options || {},
          self = this;

      options.itemTemplate = ItemEventTemplate;

      List.prototype.initialize.call(this,options);

      this.collection.on('reset', function() {
        self.render();
      });
    },
  });

  return ListEventView;
});