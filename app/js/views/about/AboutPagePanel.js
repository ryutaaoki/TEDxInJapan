define([
  'joshlib!utils/woodman',
  'joshlib!utils/dollar',
  'joshlib!vendor/underscore',
  'joshlib!vendor/backbone',
  'joshlib!ui/layout',

  'views/about/AboutView',

  'text!templates/about/AboutLayout.html'
], function(
  woodman,
  $,
  _,
  Backbone,
  Layout,

  AboutView,

  AboutLayout
) {
  var logger = woodman.getLogger('views.AboutPagePanel');
  var AboutPagePanel = Layout.extend({

    initialize: function(options) {
      logger.info('initialize AboutPagePanel');
      var options = options || {};

      options.template = AboutLayout;

      this.about = new AboutView({
        appController: options.appController,
        collection: options.appController.data.aboutContent
      });

      options.children = {
        about: this.about
      };

      Layout.prototype.initialize.call(this,options);
    },
  });

  return AboutPagePanel;
});