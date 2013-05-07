define([
  'joshlib!utils/woodman',
  'joshlib!utils/dollar',
  'joshlib!vendor/underscore',
  'joshlib!vendor/backbone',

  'joshlib!ui/list',
  'joshlib!ui/item',

  'text!templates/homepage/talks/ItemTalks.html'
], function(
  woodman,
  $,
  _,
  Backbone,

  List,
  Item,

  ItemTalksTemplate
) {
  var logger = woodman.getLogger('views.ListTalksView');
  var ListTalksView = List.extend({

    className: "talks",

    initialize: function(options) {
      logger.info('initialize ListTalks');
      var options = options || {},
          self = this;

      options.itemTemplate = ItemTalksTemplate;

      List.prototype.initialize.call(this,options);

      this.collection.off();
      this.collection.on('loaded', function() {
        self.update(true);
      });
    },
  });

  return ListTalksView;
});