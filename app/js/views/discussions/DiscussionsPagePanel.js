define([
  'joshlib!utils/woodman',
  'joshlib!utils/dollar',
  'joshlib!vendor/underscore',
  'joshlib!vendor/backbone',
  'joshlib!ui/layout',

  'views/discussions/GrabbingView'
], function(
  woodman,
  $,
  _,
  Backbone,
  Layout,

  GrabbingView
) {
  var logger = woodman.getLogger('views.HomePagePanel');
  var HomePagePanel = Layout.extend({

    initialize: function(options) {
      logger.info('initialize HomePagePanel');
      var options = options || {};

      this.grabbing = new GrabbingView({
        appController: options.appController
      });

      options.children = {
        grabbing: this.grabbing
      };

      Layout.prototype.initialize.call(this,options);
    },
  });

  return HomePagePanel;
});