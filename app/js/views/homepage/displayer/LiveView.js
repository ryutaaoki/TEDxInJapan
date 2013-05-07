define([
  'joshlib!utils/woodman',
  'joshlib!utils/dollar',
  'joshlib!vendor/underscore',
  'joshlib!vendor/backbone',

  'joshlib!ui/list',

  'text!templates/homepage/displayer/DisplayLive.html'
], function(
  woodman,
  $,
  _,
  Backbone,

  List,

  LiveTemplate
) {
  var logger = woodman.getLogger('views.LiveView');
  var LiveView = List.extend({

    className: 'tedxLive',

    initialize: function(options) {
      logger.info('initialize LiveView');
      var options = options || {},
          self = this;

      options.itemTemplate = LiveTemplate;

      List.prototype.initialize.call(this,options);

      this.collection.on('loaded', function(){
        self.update(true);
        /* At first load on homepage */
        if(Backbone.history.fragment == "home" && self.collection.length > 0)
          app.router.navigate('#home/live', {trigger:true});
      });
    },
  });

  return LiveView;
});