define([
  'joshlib!utils/woodman',
  'joshlib!utils/dollar',
  'joshlib!vendor/underscore',
  'joshlib!vendor/backbone',
  'joshlib!ui/layout',

  'views/about/AboutView',
  'views/ErrorView',

  'text!templates/about/AboutLayout.html'
], function(
  woodman,
  $,
  _,
  Backbone,
  Layout,

  AboutView,
  ErrorView,

  AboutLayout
) {
  var logger = woodman.getLogger('views.AboutPagePanel');
  var AboutPagePanel = Layout.extend({

    initialize: function(options) {
      logger.info('initialize AboutPagePanel');
      options = options || {};
      options.template = AboutLayout;

      this.about = new AboutView({
        appController: options.appController,
        collection: options.appController.data.aboutContent
      });

      this.errorView = new ErrorView({
        model: new Backbone.Model({ description: '' })
      });

      options.children = {
        about: this.about,
        errorView: this.errorView
      };

      Layout.prototype.initialize.call(this,options);
    }
  });

  return AboutPagePanel;
});