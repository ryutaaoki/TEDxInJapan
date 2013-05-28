define([
  'joshlib!utils/woodman',
  'joshlib!utils/dollar',
  'joshlib!vendor/underscore',
  'joshlib!vendor/backbone',

  'joshlib!ui/list',

  'text!templates/about/ItemAbout.html'
], function(
  woodman,
  $,
  _,
  Backbone,

  List,

  ItemAboutTemplate
) {
  var logger = woodman.getLogger('views.AboutView');
  var AboutView = List.extend({

    initialize: function(options) {
      logger.info('initialize ListPastTalks');
      var options = options || {},
          self = this;

      options.itemTemplate = ItemAboutTemplate;

      List.prototype.initialize.call(this,options);

      this.collection.off();
      this.collection.on('load', function() {
        self.update(true);
      });
    },
  });

  return AboutView;
});
