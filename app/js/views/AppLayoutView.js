define([
  'joshlib!utils/woodman',
  'joshlib!utils/dollar',
  'joshlib!vendor/underscore',
  'joshlib!vendor/backbone',

  'joshlib!ui/layout',

  'views/MenuView',
  'views/AppPanel',
  'views/Footer'
], function(
  woodman,
  $,
  _,
  Backbone,

  Layout,

  Menu,
  AppPanel,
  Footer
) {
  var logger = woodman.getLogger('views.AppLayoutView');
  var AppLayoutView = Layout.extend({

    initialize: function(options) {
      logger.info('initialize AppLayoutView');
      var options = options || {};

      this.menuList = new Menu({
        appController: options.appController,
        model: new Backbone.Model(),
        el: "#nav"
      });

      this.panel = new AppPanel({
        appController: options.appController,
        el: "#content"
      });

      this.footer = new Footer({
        appController: options.appController,
        model: new Backbone.Model(),
        el: 'footer'
      });

      options.children = {
        menuList: this.menuList,
        panel: this.panel,
        footer: this.footer
      };

      Layout.prototype.initialize.call(this,options);
    },

    enhance: function(options) {
      Layout.prototype.enhance.call(this,options);
    }

  });

  return AppLayoutView;
});
